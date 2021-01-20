<?php

namespace App\Http\Controllers;

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
        return $user1;
    }
}
