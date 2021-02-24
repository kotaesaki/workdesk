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
        if($posts->isEmpty()){
            return response()->json([null, $tag]);
        }
        foreach($posts as $post){
            $data[] = Post::with(['user' => function ($query) {
                $query->with('profile');
            }])->find($post->post_id);
        }
        array_multisort(array_map('strtotime', array_column($data, 'created_at')), SORT_DESC, $data);
        return response()->json([$data, $tag]);
    }
}
