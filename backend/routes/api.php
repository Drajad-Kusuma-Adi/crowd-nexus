<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Private APIs
Route::middleware(CheckToken::class)->group(function () {
    Route::get('/signout', [UserController::class, 'signOut']);

    Route::get('/userinfo', [UserController::class, 'getUserInfo']);
});
