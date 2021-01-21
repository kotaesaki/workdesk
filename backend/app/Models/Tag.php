<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable =[
        'tag_post_id',
        'tag_name'
    ];
    protected $primaryKey = 'tag_id';
    public function post()
    {
        return $this->belongsTo('App\Models\Post');
    }
    
}
