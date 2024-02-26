<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;

    protected $table = 'comments';

    public $timestamps = false;

    protected $fillable = [
        'users_id',
        'events_id',
        'comment',
        'date'
    ];
}
