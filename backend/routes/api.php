<?php

use Illuminate\Http\Request;
use App\Http\Middleware\CheckToken;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public APIs
// Authentication APIs
Route::post('/signin', [UserController::class, 'signIn']);
Route::post('/register', [UserController::class, 'register']);
Route::get('/checkToken', [UserController::class, 'checkToken']);
Route::get('/getUserById', [UserController::class, 'getUserById']);

// Guest Read APIs
Route::get('/searchEvent', [EventController::class, 'searchEvent']);
Route::get('/eventDetails', [EventController::class, 'getEventDetails']);
Route::get('/allEvents', [EventController::class, 'getAllEvents']);
Route::get('/getEventCreator', [EventController::class, 'getEventCreator']);
Route::get('/getEventTickets', [EventController::class, 'getEventTickets']);
Route::get('/getComments', [EventController::class, 'getCommentsByEventId']);

// Private APIs
Route::post('/photo', [UserController::class, 'uploadPhoto']);
Route::middleware(CheckToken::class)->group(function () {
    // User API
    Route::get('/signout', [UserController::class, 'signOut']);

    // Create Delete Events API
    Route::post('/createEvent', [EventController::class, 'createEvent']);
    Route::post('/createTickets', [EventController::class, 'createTickets']);
    Route::delete('/deleteEvent', [EventController::class, 'deleteEvent']);
    Route::post('/sendComment', [EventController::class, 'sendComment']);
    Route::post('/purchaseTicket', [EventController::class, 'purchaseTicket']);

    // Read API
    Route::get('/userEvents', [EventController::class, 'getEventsByUsersId']);
    Route::get('/userTickets', [EventController::class, 'getTicketsByUsersId']);
    Route::get('/getTicketEvents', [EventController::class, 'getTicketEvents']);
    Route::get('/ticketDetails', [EventController::class, 'getTicketDetails']);

    // Wishlist API
    Route::post('/wishlistEvent', [EventController::class, 'wishlistEvent']);
    Route::get('/getUserWishlists', [EventController::class, 'getUserWishlists']);
    Route::get('/checkIsWishlist', [EventController::class, 'checkIsWishlist']);
    Route::delete('/unwishlistEvent', [EventController::class, 'unwishlistEvent']);

    // Report Event API
    Route::post('/reportEvent', [EventController::class, 'reportEvent']);
});
