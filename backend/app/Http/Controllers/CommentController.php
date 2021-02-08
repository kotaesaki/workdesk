<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $comments = Comment::where('post_id', $request->post_id)
            ->get();
        if ($comments->isEmpty()) {
            $commentList = [];
            return $commentList;
        } else {
            foreach ($comments as $val) {
                $commentList[] = Comment::with(['user' => function ($query) {
                    $query->with('profile');
                }])->find($val->comment_id);
            }
            return $commentList;
        }
    }
    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required|string',
            'user_id' => 'required',
            'post_id' => 'required',
        ]);

        $pushComment = Comment::create([
            'post_id' => $request->post_id,
            'user_id' => $request->user_id,
            'comment_message' => $request->comment,
        ]);
        $comment = Comment::with(['user' => function ($query) {
            $query->with('profile');
        }])->find($pushComment->comment_id);
        return $comment;
    }
}
