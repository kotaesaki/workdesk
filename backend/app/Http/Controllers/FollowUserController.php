<?php

namespace App\Http\Controllers;

use App\Models\FollowUser;
use Illuminate\Http\Request;

class FollowUserController extends Controller
{
    public function follow()
    {
        $follow = FollowUser::create([]);
    }

    public function unfollow()
    {
    }
}
