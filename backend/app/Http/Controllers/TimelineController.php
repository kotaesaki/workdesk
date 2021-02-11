<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class TimelineController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user'=> function($query){
            $query->with('profile:user_id,icon_path');
        }])->orderBy('created_at', 'desc')->limit(10)->get();

        return response($posts);
    }
}
