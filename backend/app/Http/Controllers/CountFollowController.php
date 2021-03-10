<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class CountFollowController extends Controller
{
    public function count (Request $request){
        $user = User::find($request->user_id);
        $follow = $user->follow()->count();
        $follower = $user->followUsers()->count();
        return [$follow,$follower];
    }
}
