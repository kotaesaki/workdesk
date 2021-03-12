<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        $user = User::find($request->user()->id);
        $profile = $user->profile;
        return response()->json(['user' => $user, 'profile' => $profile], 200);
    });
});

Route::get('/', 'App\Http\Controllers\HomeController@index')->name('home');
Route::get('/getId/{login_id}', 'App\Http\Controllers\MypageController@getId')->name('api.getId');
Route::get('/getPost', 'App\Http\Controllers\MypageController@getPost')->name('api.getPost');
Route::get('/timeline', 'App\Http\Controllers\TimelineController@index')->name('api.timeline');
Route::get('/trend_timeline', 'App\Http\Controllers\TimelineController@getTrend')->name('api.trendTimeline');
Route::get('/trend_items', 'App\Http\Controllers\TimelineController@getItems')->name('api.trendItems');
Route::get('/individual', 'App\Http\Controllers\IndividualController@index')->name('api.individual');
Route::get('/favorite', 'App\Http\Controllers\FavoriteController@isLiked')->name('api.isLiked_favorite');
Route::get('/comment', 'App\Http\Controllers\CommentController@index')->name('api.index_comment');
Route::get('/follow', 'App\Http\Controllers\FollowUserController@checkFollow')->name('api.check_follow');
Route::post('/register', 'App\Http\Controllers\Auth\Api\RegisterController@register')->name('api.register');
Route::post('/login', 'App\Http\Controllers\Auth\Api\LoginController@login')->name('api.login');
Route::post('/logout', 'App\Http\Controllers\Auth\Api\LoginController@logout')->name('api.logout');
Route::get('/countFollow', 'App\Http\Controllers\CountFollowController@count')->name('api.countFollow');
Route::get('/search', 'App\Http\Controllers\SearchController@search')->name('api.search');
Route::get('/tag', 'App\Http\Controllers\TagController@search')->name('api.searchTag');

Route::get('/post_upload/{login_id}', 'App\Http\Controllers\PostController@index')->name('show_post_upload');
Route::get('/tagList', 'App\Http\Controllers\TagController@index')->name('show_tagList');
Route::get('/profile/{login_id}', 'App\Http\Controllers\ProfileController@index')->name('profile');
Route::post('/profile/{login_id}', 'App\Http\Controllers\ProfileController@store')->name('store_profile');
Route::get('/account/{login_id}', 'App\Http\Controllers\AccountController@index')->name('account');
Route::post('/account/{login_id}', 'App\Http\Controllers\AccountController@update')->name('update_account');
Route::post('/post_upload/{login_id}', 'App\Http\Controllers\PostController@store')->name('create_post_upload');
Route::post('/favorite', 'App\Http\Controllers\FavoriteController@store')->name('api.store_favorite');
Route::delete('/favorite', 'App\Http\Controllers\FavoriteController@delete')->name('api.delete_favorite');
Route::get('/mylikes', 'App\Http\Controllers\FavoriteController@getMylikes')->name('api.getMylikes_favorite');
Route::get('/mytag/{login_id}', 'App\Http\Controllers\MytagController@getMytag')->name('api.getMytag');
Route::post('/comment', 'App\Http\Controllers\CommentController@store')->name('api.create_comment');
Route::post('/follow', 'App\Http\Controllers\FollowUserController@follow')->name('api.push_follow');
Route::delete('/follow', 'App\Http\Controllers\FollowUserController@unfollow')->name('api.push_unfollow');
Route::get('/follow/{login_id}', 'App\Http\Controllers\FollowUserController@showFollow')->name('api.show_follow');
Route::get('/follower/{login_id}', 'App\Http\Controllers\FollowUserController@showFollower')->name('api.show_follower');
Route::get('/searchItem', 'App\Http\Controllers\ItemController@index')->name('api.search_item');

