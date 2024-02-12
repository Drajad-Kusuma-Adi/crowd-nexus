<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;

    protected $table = 'users';

    public $timestamps = false;

    protected $fillable = [
        'email',
        'name',
        'password'
    ];

    protected $hidden = [
        'password'
    ];

    public function events()
    {
        return $this->hasMany(Events::class);
    }

    public function tickets()
    {
        return $this->hasManyThrough(
            Tickets::class,
            Events::class,
            'user_id',
            'event_id',
            'id',
            'id'
        );
    }

    public function purchases()
    {
        return $this->belongsToMany(Events::class, 'purchases');
    }

    public function wishlists()
    {
        return $this->belongsToMany(Events::class, 'wishlists');
    }
}
