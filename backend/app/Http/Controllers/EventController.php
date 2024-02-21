<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Models\Events;
use App\Models\Tickets;
use App\Models\Wishlists;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function createEvent(Request $request) {
        $request->validate([
            'users_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
            'location' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,svg',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric'
        ]);

        // Store Image
        $imagePath = $request->file('image')->store('public/photos');

        // Create Event
        $event = Events::create([
            'users_id' => $request->users_id,
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'time' => $request->time,
            'location' => $request->location,
            'image' => basename($imagePath),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude
        ]);

        return response()->json([
            'success' => true,
            'message' => "Event successfully created",
            'event' => $event
        ], 200);
    }

    public function createTickets(Request $request) {
        $request->validate([
            'event_id' => 'required|integer',
            'name' => 'required|string',
            'benefits' => 'required|string',
            'price' => 'required|string'
        ]);

        // Check if ID exists
        $event = Events::where('id', $request->event_id)->first();
        if ($event) {
            // Create new ticket
            Tickets::create([
                'events_id' => $request->event_id,
                'name' => $request->name,
                'benefits' => $request->benefits,
                'price' => $request->price
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'All events created'
        ], 200);
    }

    public function deleteEvent(Request $request) {
        $request->validate([
            'event_id' => 'required|integer',
        ]);

        $tickets = Tickets::where('events_id', $request->event_id)->get();

        foreach ($tickets as $ticket) {
            Tickets::where('id', $ticket->id)->delete();
        }

        Events::where('id', $request->event_id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event and tickets deleted'
        ], 200);
    }

    public function getEventsByUsersId(Request $request) {
        $user = Users::where('token', $request->bearerToken())->first();

        $events = Events::where('users_id', $user->id)->get();

        return response()->json([
            'success' => true,
            'message' => 'Get events successful',
            'events' => $events
        ], 200);
    }

    public function getAllEvents(Request $request) {
        $events = Events::all();

        return response()->json([
            'success' => true,
            'message' => 'Get events successful',
            'events' => $events
        ], 200);
    }

    public function getEventDetails(Request $request) {
        $request->validate([
            'event_id' => 'required|integer'
        ]);

        $event = Events::where('id', $request->event_id)->first();

        return response()->json([
            'success' => true,
            'message' => "Get event details successful",
            'event' => $event
        ], 200);
    }

    public function getEventCreator(Request $request) {
        $request->validate([
            'user_id' => 'required|integer'
        ]);

        $user = Users::where('id', $request->user_id)->first();

        return response()->json([
            'success' => true,
            'message' => 'Get event creator successful',
            'user' => $user
        ], 200);
    }

    // public function reportEvent(Request $request) {
        // TODO:
    // }

    public function wishlistEvent(Request $request) {
        $request->validate([
            'user_id' => 'required|integer',
            'event_id' => 'required|integer'
        ]);

        Wishlists::create([
            'users_id' => $request->user_id,
            'events_id' => $request->event_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Wishlist added'
        ], 200);
    }

    public function getUserWishlists(Request $request) {
        $request->validate([
            'user_id' => 'required|integer'
        ]);

        $wishlists = Wishlists::where('users_id', $request->user_id)->get();

        return response()->json([
            'success' => true,
            'message' => 'Get wishlist by user successful',
            'wishlists' => $wishlists
        ], 200);
    }

    public function unwishlistEvent(Request $request) {
        $request->validate([
            'user_id' => 'required|integer',
            'event_id' => 'required|integer'
        ]);

        Wishlists::where('users_id', $request->user_id)->where('events_id', $request->event_id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Wishlist removed'
        ], 200);
    }
}
