<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use App\Models\Item;
use App\Models\Profile;
use App\Models\Tag;
use App\Models\Favorite;

class IndividualController extends Controller
{
    public function index(Request $request)
    {
        $post = Post::find($request->post_id);
        $postUser = $post->user;
        $profile = $postUser->profile;
        $tags = $post->tags()->get();
        $items = Item::where('post_id',$post->post_id)->get();
        $authUser = User::find($request->user_id);
        $status = Favorite::where('user_id', $request->user_id)
            ->where('post_id', $post->post_id)
            ->exists();
        $count_fav = Favorite::where('post_id', $request->post_id)->count();

        return response()->json([
            'post' => $post,
            'tags' => $tags,
            'items' => $items,
            'status' => $status,
            'count_fav' => $count_fav
        ], 200);
    }
}
