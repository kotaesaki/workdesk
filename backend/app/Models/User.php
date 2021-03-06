<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'login_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    /**
     * ユーザのプロフィールを取得
     *
     * @return void
     */
    public function profile()
    {
        return $this->hasOne('App\Models\Profile');
    }

    public function post()
    {
        return $this->hasMany('App\Models\Post');
    }
    public function followUsers()
    {
        return $this->belongsToMany(
            'App\Models\User',
            'follow_users',
            'followed_user_id',
            'following_user_id'
        );
    }
    public function follow()
    {
        return $this->belongsToMany(
            'App\Models\User',
            'follow_users',
            'following_user_id',
            'followed_user_id'
        );
    }
    public function favorite()
    {
        return $this->hasMany('App\Models\Favorite');
    }
    public function comment()
    {
        return $this->belongsToMany(
            'App\Models\Comment',
            'comments',
            'user_id',
            'comment_id'
        );
    }
}
