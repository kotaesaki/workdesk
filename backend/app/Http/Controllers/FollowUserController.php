<?php

namespace App\Http\Controllers;

use App\Models\FollowUser;
use Illuminate\Http\Request;

class FollowUserController extends Controller
{
    public function follow(Request $request)
    {
        FollowUser::firstOrCreate([
            'followed_user_id' => $request->post_user,
            'following_user_id' => $request->auth_user
        ]);
        return 'true';
    }

    public function unfollow(Request $request)
    {
        $follow = FollowUser::where('followed_user_id', $request->post_user)
            ->where('following_user_id', $request->auth_user)
            ->first();
        if ($follow) {
            $follow->delete();
            return 'false';
        }
    }
    public function checkFollow(Request $request)
    {
        $checked = FollowUser::where('followed_user_id', $request->post_user)
            ->where('following_user_id', $request->auth_user)
            ->exists();
        return $checked;
    }
    public function showFollow()
    {
    }
    public function showFollower()
    {
    }
}
