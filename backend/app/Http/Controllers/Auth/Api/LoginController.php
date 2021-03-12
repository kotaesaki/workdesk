<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        // バリデーション
        $this->validateLogin($request);

        // ユーザーの取得
        $user = User::where('login_id', $request->login_id)->first();

        // 取得できない場合、パスワードが不一致の場合エラー
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'login_id' => [__('ログインIDまたはパスワードが違います。')],
            ]);
        }

        // tokenの作成
        $token = $user->createToken('authToken')->plainTextToken;
        if ($user->profile) {
            $profile = $user->profile;
        } else {
            return response()->json(['token' => $token, 'user' => $user, 'profile' => ''], 200);
        }
        return response()->json(['token' => $token, 'user' => $user, 'profile' => $profile], 200);
    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateLogin(Request $request)
    {
        // オーバーライドして、デバイス名を必須化しています
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }


    /**
     * Handle a logout request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $user = User::where('login_id', $request->login_id)->first();
        // tokenの削除
        $user->tokens()->delete();

        return response()->json(['message' => 'logouted']);
    }
}
