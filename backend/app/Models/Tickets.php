<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    use HasFactory;

    protected $table = 'tickets';

    public $timestamps = false;

    protected $fillable = [
        'events_id',
        'name',
        'benefits',
        'price'
    ];

    public function event()
    {
        return $this->belongsTo(Events::class);
    }
}
