<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
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
}
