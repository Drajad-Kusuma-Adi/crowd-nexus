<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;

    protected $table = 'events';

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(Users::class);
    }

    public function tickets()
    {
        return $this->hasMany(Tickets::class);
    }
}
