<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reports extends Model
{
    use HasFactory;

    protected $table = 'reports';

    public $timestamps = false;

    protected $fillable = [
        'users_id',
        'events_id',
        'description'
    ];
}
