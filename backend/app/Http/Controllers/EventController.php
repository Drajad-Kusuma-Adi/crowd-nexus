<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Models\Events;
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
            'message' => "Event successfully created"
        ], 200);
    }

    public function createTickets(Request $request) {
        $request->validate([
            'events_id' => 'required|integer',
            'name' => 'required|string',
            'benefits' => 'required|string',
            'price' => 'required|numeric'
        ]);

        // TODO: For each value in tickets array, create new ticket
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
}
