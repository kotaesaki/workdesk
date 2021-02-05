<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MypageController;
use App\Models\User;

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
        $user = User::find($request->user()->id);
        $profile = $user->profile;
        return response()->json(['user' => $user, 'profile' => $profile], 200);
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
Route::get('/timeline', 'App\Http\Controllers\TimelineController@index')->name('api.timeline');
Route::get('/individual', 'App\Http\Controllers\IndividualController@index')->name('api.individual');
Route::post('/favorite', 'App\Http\Controllers\FavoriteController@store')->name('api.store_favorite');
Route::delete('/favorite', 'App\Http\Controllers\FavoriteController@delete')->name('api.delete_favorite');
Route::get('/favorite', 'App\Http\Controllers\FavoriteController@isLiked')->name('api.isLiked_favorite');
Route::get('/mylikes', 'App\Http\Controllers\FavoriteController@getMylikes')->name('api.getMylikes_favorite');

Route::get('/follow', 'App\Http\Controllers\FollowUserController@showFollow')->name('api.show_follow');
Route::post('/follow', 'App\Http\Controllers\FollowUserController@follow')->name('api.push_follow');
Route::delete('/follow', 'App\Http\Controllers\FollowUserController@unfollow')->name('api.push_unfollow');


Route::post('/register', 'App\Http\Controllers\Auth\Api\RegisterController@register')->name('api.register');
Route::post('/login', 'App\Http\Controllers\Auth\Api\LoginController@login')->name('api.login');
Route::post('/logout', 'App\Http\Controllers\Auth\Api\LoginController@logout')->name('api.logout');
