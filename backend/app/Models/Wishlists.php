<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlists extends Model
{
    use HasFactory;

    protected $table = 'wishlists';

    public $timestamps = false;

    protected $fillable = [
        'users_id',
        'events_id'
    ];
}
