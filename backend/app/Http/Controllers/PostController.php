<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
