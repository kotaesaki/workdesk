<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'followed_user_id',
        'following_user_id'
    ];
    protected $table = 'follow_users';
}
