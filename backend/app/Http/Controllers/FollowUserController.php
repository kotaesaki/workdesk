<?php

namespace App\Http\Controllers;

use App\Models\FollowUser;
use App\Models\User;
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
    public function showFollow(Request $request)
    {
        $follows = User::with(['follow' => function ($query) {
            $query->with('profile');
        }])->find($request->user_id);
        return response()->json(['follow' => $follows->follow], 200);
    }
    public function showFollower(Request $request)
    {
        $followers = User::with(['followUsers' => function ($query) {
            $query->with('profile');
        }])->orderBy('created_at', 'asc')->find($request->user_id);
        $sss = User::find($request->user_id);
        $aaa = $sss->followUsers;
        return response()->json(['follower' => $followers], 200);
    }
}
