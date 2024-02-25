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
        'password',
        'image'
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
            'users_id',
            'events_id',
            'id',
            'id'
        );
    }

    public function purchases()
    {
        return $this->belongsToMany(Tickets::class, 'purchases');
    }

    public function wishlists()
    {
        return $this->belongsToMany(Events::class, 'wishlists');
    }

    public function reports()
    {
        return $this->belongsToMany(Events::class, 'reports');
    }

    public function comments()
    {
        return $this->belongsToMany(Events::class, 'comments');
    }
}
