<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Expr\Cast\Object_;

class PostController extends Controller
{
    public function index($login_id)
    {
        $user = User::find($login_id);
        $profile = Profile::where('user_id', $login_id)->first();
        return [$user, $profile];
    }
    public function store(PostRequest $request)
    {
        if(app()->environment('local')){
            $file_name = request()->file->getClientOriginalName();
            $disk = Storage::disk('s3')->putFile('/test/posts', request()->file,'public');
            $path = Storage::disk('s3')->url($disk);
            DB::beginTransaction();
            try {
                $user = User::find($request->id);
                $post = Post::create([
                    'user_id' => $user->id,
                    'photo_name' => $file_name,
                    'photo_path' => $path,
                    'description' => $request->description,
                ]);
                foreach ($request->tag as $value) {
                    Tag::firstOrCreate([
                        'tag_name' => $value
                    ]);
                }
                if(!empty($request->items)){
                    foreach($request->items as $key=>$value){
                        $array = json_decode($value,true);
                        Item::create([
                            'post_id' => $post->post_id,
                            'item_code'=> $array["itemCode"],
                            'item_name'=> $array["itemName"],
                            'item_price' => $array["itemPrice"],
                            'item_url'=> $array["itemUrl"],
                            'item_image_url' => $array["itemImageUrl"],
                            'item_relation_x' => $array["relationX"],
                            'item_relation_y' => $array["relationY"]
                        ]);
                    }
                }
                $tagIds = array();
                foreach ($request->tag as $val) {
                    $tagIds[] = Tag::select('tag_id')->where('tag_name', $val)
                        ->first()->tag_id;
                }
                $post->tags()->sync($tagIds, false);
                DB::commit();
                
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }else if(app()->environment('production')){
            $file_name = request()->file->getClientOriginalName();
            $disk = Storage::disk('s3')->putFile('/production/posts', request()->file,'public');
            $path = Storage::disk('s3')->url($disk);
            DB::beginTransaction();
            try {
                $user = User::find($request->id);
                $post = Post::create([
                    'user_id' => $user->id,
                    'photo_name' => $file_name,
                    'photo_path' => $path,
                    'description' => $request->description,
                ]);
                foreach ($request->tag as $value) {
                    Tag::firstOrCreate([
                        'tag_name' => $value
                    ]);
                }
                if(!empty($request->items)){
                    foreach($request->items as $key=>$value){
                        $array = json_decode($value,true);
                        Item::create([
                            'post_id' => $post->post_id,
                            'item_code'=> $array["itemCode"],
                            'item_name'=> $array["itemName"],
                            'item_price' => $array["itemPrice"],
                            'item_url'=> $array["itemUrl"],
                            'item_image_url' => $array["itemImageUrl"],
                            'item_relation_x' => $array["relationX"],
                            'item_relation_y' => $array["relationY"]
                        ]);
                    }
                }
                $tagIds = array();
                foreach ($request->tag as $val) {
                    $tagIds[] = Tag::select('tag_id')->where('tag_name', $val)
                        ->first()->tag_id;
                }
                $post->tags()->sync($tagIds, false);
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            } 
        }
    }
}
