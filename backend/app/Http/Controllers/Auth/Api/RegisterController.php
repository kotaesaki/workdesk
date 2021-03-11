<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    public function register(RegisterRequest $request)
    {

        // ユーザーの作成とトークンの作成します
        $data = DB::transaction(function () use ($request) {
            $user = $this->create($request->all());
            $token = $user->createToken($request->device_name ?? 'undefined')->plainTextToken;
            $profile = Profile::create([
                'user_id' => $user->id,
                'icon_title' => 'default.jpg',
                'icon_path' => 'https://takuwaku-s3.s3-ap-northeast-1.amazonaws.com/common/default.jpg'

            ]);
            return json_encode(['token' => $token, 'user' => $user, 'profile' => $profile]);
        });
        // userとtokenのjsonを返却
        return response($data);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        return User::create([
            'login_id' => $data['login_id'],
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
