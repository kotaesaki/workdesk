<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use App\Models\Profile;
use App\Models\Tag;
use App\Models\Favorite;

class IndividualController extends Controller
{
    public function index(Request $request)
    {
        $post = Post::find($request->post_id);
        $user = $post->user;
        $profile = $user->profile;
        $tags = $post->tags()->get();
        $status = Favorite::where('user_id', $post->user_id)
            ->where('post_id', $post->post_id)
            ->exists();

        return response()->json(['post' => $post, 'user' => $user, 'profile' => $profile, 'tags' => $tags, 'status' => $status], 200);
    }
}
