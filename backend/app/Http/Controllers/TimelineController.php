<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Favorite;
use Carbon\Carbon;

class TimelineController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user'=> function($query){
            $query->with('profile:user_id,icon_path');
        }])->orderBy('created_at', 'desc')->paginate(9);

        return response($posts);
    }
    public function getTrend()
    {
        //現在から30日分の投稿を取得する
        //30日以上前の投稿はtrend候補から除外する
        $favorites = Post::withCount('favorite')->orderBy('created_at','desc')
            ->whereRaw( "created_at >= DATE_SUB( CURDATE(),INTERVAL 30 DAY )" )
            ->get(); 
        $rates = array();
        foreach($favorites as $favorite){  
            //現在時刻から投稿日を引く＝投稿から何日経過しているか
            $x = floor((strtotime(Carbon::now()) - strtotime($favorite->created_at)) /60/60/24);
            if($x != 0){
                //1日あたりのいいね率　＝　いいね数　/　投稿からの経過日付　
                $rates = $rates + array($favorite->post_id => $favorite->favorite_count / $x);
            }
        }
        arsort($rates);
        $i = 0;
        foreach($rates as $key => $val){
            if($i >= 9){
                break;
            }
            $posts[] = Post::with(['user'=> function($query){
                $query->with('profile:user_id,icon_path');
            }])->orderBy('created_at', 'desc')->find($key);
            $i++;
        }
        return response()->json($posts);

    }
}
