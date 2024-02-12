<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Users;
use App\Models\Events;
use App\Models\Tickets;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create users and events with tickets
        // $users = Users::factory()
        //     ->count(10) // Adjust the count as needed
        //     ->create()
        //     ->each(function ($user) {
        //         $events = Events::factory()
        //             ->count(3)
        //             ->create(['users_id' => $user->id]) // Use create instead of make
        //             ->each(function ($event) {
        //                 $tickets = Tickets::factory()
        //                     ->count(rand(3,  5))
        //                     ->make(['events_id' => $event->id]);
        //                 $event->tickets()->saveMany($tickets);
        //             });
        //     });

        // Create purchases and wishlists
        // Users::all()->each(function ($user) {
        //     $ticketsToAttach = Tickets::all()->random(rand(1,  3));
        //     $user->purchases()->attach($ticketsToAttach->pluck('id'));
        // });
        // Users::all()->each(function ($user) {
        //     $eventsToAttach = Events::all()->random(rand(1,  3));
        //     $user->wishlists()->attach($eventsToAttach->pluck('id'));
        // });

        // Create users
        $users = Users::factory(10)->create();
    }
}
