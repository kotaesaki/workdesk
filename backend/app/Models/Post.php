<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'description',
        'photo_name',
        'photo_path'
    ];
    protected $primaryKey = 'post_id';

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
    public function tags()
    {
        return $this->belongsToMany(
            'App\Models\Tag',
            'post_tag',
            'post_id',
            'tag_id'
        );
    }
    public function favorite()
    {
        return $this->hasMany('App\Models\Favorite', 'post_id');
    }
    public function comment()
    {
        return $this->hasMany('App\Models\Comment', 'comment_id');
    }
    public function item(){
        return $this->hasMany('App\Models\Item', 'item_id');
    }
}
