<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'item_code',
        'item_image_url',
        'item_name',
        'item_price',
        'item_url',
        'item_relation_x',
        'item_relation_y',
    ];
    protected $primaryKey = 'item_id';

    public function post(){
        return $this->belongsTo('App\Models\Item','post_id');
    }
    
}
