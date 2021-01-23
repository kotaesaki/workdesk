<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable =[
        'tag_name',
    ];
    protected $primaryKey = 'tag_id';
    public function post()
    {
        return $this->belongsToMany(
            'App\Models\Post',
            'post_tag',
            'tag_id',
            'post_id'
        );
    } 
    
}
