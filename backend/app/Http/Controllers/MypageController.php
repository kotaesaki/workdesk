<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;

class MypageController extends Controller
{


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function getId($login_id)
    {
        $user = User::find($login_id);
        $user->profile->where('user_id', $login_id)->first();
        return $user;
    }

    public function getPost(Request $request)
    {
        $posts = Post::where('user_id', $request->userId)
            ->orderBy('created_at', 'desc')->paginate(5);
        if ($posts) {
            foreach ($posts as $post) {
                $tags[] = Post::find($post->post_id)->tags()->paginate(5);
                return [$posts, $tags];
            }
        }
        return [];
    }
}
