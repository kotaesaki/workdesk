<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;


class ProfileController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($login_id)
    {
        $user = User::find($login_id);
        $profile = Profile::where('user_id', $login_id)->first();
        return [$user, $profile];
    }
    public function store(Request $request)
    {


        $user = User::find($request->id);
        $user->name = $request->name;
        $user->save();
        Profile::updateOrCreate(
            ['user_id' => $request->id],
            [
                'website_url' => $request->website_url,
                'twitter_url' => $request->twitter_url,
                'shokai' => $request->shokai
            ]
        );
    }
}
