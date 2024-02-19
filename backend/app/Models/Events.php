<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;

    protected $table = 'events';

    public $timestamps = false;

    protected $fillable = [
        'users_id',
        'title',
        'description',
        'date',
        'time',
        'location',
        'image',
        'latitude',
        'longitude'
    ];

    public function user()
    {
        return $this->belongsTo(Users::class);
    }

    public function tickets()
    {
        return $this->hasMany(Tickets::class);
    }
}
