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
    public function index($login_id)
    {
        $user = User::find($login_id);
        $user1 = User::select()
            ->join('profiles', 'profiles.user_id', '=', 'users.id')
            ->where('id', $login_id)
            ->get();
        $posts = Post::where('user_id', $login_id)
            ->orderBy('created_at', 'desc')->get();
        if ($posts) {
            foreach ($posts as $post) {
                $post11[] = Post::find($post->post_id)->tags()->get();
                return [$user1, $posts, $post11];
            }
        }
        return [$user1];
    }
}
