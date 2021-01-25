<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function index($login_id)
    {
        $user = User::find($login_id);
        $profile = Profile::where('user_id', $login_id)->first();
        return [$user, $profile];
    }
    public function store(Request $request)
    {
        $request->validate([]);

        try {
            $file_name = request()->file->getClientOriginalName();
            request()->file->storeAs('public', $file_name);
            DB::beginTransaction();
            try {
                $user = User::find($request->id);
                Post::create([
                    'user_id' => $user->id,
                    'photo_name' => $file_name,
                    'photo_path' => 'storage/' . $file_name,
                    'description' => $request->description,
                ]);
                Tag::create([
                    'tag_name' => $request->tag
                ]);
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
            }
            /* $post = Post::find(Post::max('post_id'));
            $post->tags()->attach($request->tag); */
        } catch (\Exception $e) {
        }
    }
}
