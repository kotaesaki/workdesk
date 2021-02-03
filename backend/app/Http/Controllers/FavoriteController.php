<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\User;
use App\Models\Post;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        $user_id = Post::find($request->post_id);
        Favorite::create([
            'user_id' => $user_id->user_id,
            'post_id' => $request->post_id,
        ]);
        return 'true';
    }
    public function delete(Request $request)
    {
        $user_id = Post::find($request->post_id);

        $post = Favorite::where('user_id', $user_id->user_id)
            ->where('post_id', $request->post_id)
            ->first();
        $post->delete();

        return 'false';
    }

    public function getMylikes(Request $request)
    {
        $favorites = User::with(['favorite' => function ($query) {
            $query->with('post');
        }])->find($request->user_id);

        return response()->json(['mylikes' => $favorites], 200);
    }
}
