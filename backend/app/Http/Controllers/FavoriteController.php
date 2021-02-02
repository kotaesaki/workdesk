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
        Favorite::create([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
        ]);
        return 'true';
    }
    public function delete(Request $request)
    {
        $post = Favorite::where('user_id', $request->user_id)
            ->where('post_id', $request->post_id)
            ->first();
        $post->delete();

        return 'false';
    }
}
