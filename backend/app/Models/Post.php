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
    public function tag()
    {
        return $this->belongsToMany(
            'App\Models\Term',
            'post_tag',
            'post_id',
            'tag_id'
        );
    } 
}
