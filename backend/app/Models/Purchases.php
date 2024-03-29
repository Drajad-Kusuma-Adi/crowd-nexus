<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchases extends Model
{
    use HasFactory;

    protected $table = 'purchases';

    public $timestamps = false;

    protected $fillable = [
        'users_id',
        'tickets_id'
    ];
}
