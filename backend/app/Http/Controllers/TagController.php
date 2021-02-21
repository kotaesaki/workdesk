<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use App\Models\User;
use App\Models\Post;
use Doctrine\DBAL\Types\Type;

class TagController extends Controller
{
    public function index()
    {
        try {
            $tags = Tag::all()->pluck('tag_name')->toArray();
            return $tags;
        } catch (\Exception $e) {
        }
    }
    public function search(Request $request)
    {
        $tag = Tag::find($request->tag_id);
        $posts = $tag->posts;
        foreach($posts as $post){
            $users[] = $post->user;
        }
        foreach($users as $user){
            $profiles[] = $user->profile;
        }
        return response()->json([$posts, $users, $profiles]);
    }
}
