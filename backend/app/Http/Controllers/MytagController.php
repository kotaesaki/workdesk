<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class MytagController extends Controller
{
    public function getMytag(Request $request)
    {
        $user = User::find($request->user_id);
        $tags = User::with(['post' => function ($query) {
            $query->with('tags');
        }])->find($request->user_id);
        foreach($tags->post as $post){
            foreach($post->tags as $tag){
                $arr[] = $tag->tag_name; 
            }
        }
        $tag_count = array_count_values($arr);

        return $tag_count;
    }
}
