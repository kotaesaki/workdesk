<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $keyword = $request->q;

        if(!empty($keyword)){
            $tag = Tag::select('tag_id', 'tag_name')->where('tag_name', 'like', "%{$keyword}%")->get();
            $user = User::select('id','name','login_id')->where('name', 'LIKE', "%{$keyword}%")
                ->orWhere('login_id', 'LIKE', "%{$keyword}%")->get();
        }
        return response()->json([$tag, $user]);
    }
}
