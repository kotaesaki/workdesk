<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MypageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/* 
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
 */

/* Route::post('/register', 'App\Http\Controllers\RegisterController@register');
Route::post('/login', 'App\Http\Controllers\LoginController@login');
Route::post('/logout', 'App\Http\Controllers\LoginController@logout'); */

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::delete('/user', function (Request $request) {
        $user = $request->user();
        dd($user->tokens());
        $user->tokens()->delete();
        return response()->json(['message' => 'logouted']);
    });
});
Route::get('/', 'App\Http\Controllers\HomeController@index')->name('home');


Route::get('/mypage/{login_id}', 'App\Http\Controllers\MypageController@index')->name('mypage');
Route::get('/profile/{login_id}', 'App\Http\Controllers\ProfileController@index')->name('profile');
Route::post('/profile/{login_id}', 'App\Http\Controllers\ProfileController@store')->name('store_profile');
Route::get('/account/{login_id}', 'App\Http\Controllers\AccountController@index')->name('account');
Route::post('/account/{login_id}', 'App\Http\Controllers\AccountController@update')->name('update_account');
Route::get('/tagList', 'App\Http\Controllers\TagController@index')->name('show_tagList');
Route::get('/post_upload/{login_id}', 'App\Http\Controllers\PostController@index')->name('show_post_upload');
Route::post('/post_upload/{login_id}', 'App\Http\Controllers\PostController@store')->name('create_post_upload');


Route::post('/register', 'App\Http\Controllers\Auth\Api\RegisterController@register')->name('api.register');
Route::post('/login', 'App\Http\Controllers\Auth\Api\LoginController@login')->name('api.login');
Route::post('/logout', 'App\Http\Controllers\Auth\Api\LoginController@logout')->name('api.logout');
