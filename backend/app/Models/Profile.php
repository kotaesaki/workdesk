<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'website_url',
        'twitter_url',
        'shokai',
    ];
    protected $primaryKey = 'profiles_id';

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
