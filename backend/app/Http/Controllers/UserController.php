<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'name' => 'required',
            'password' => 'required',
        ]);

        // Check if existing user already exist
        $existUser = Users::where('email', $request->email)->first();
        if ($existUser) {
            return response()->json([
                'success' => false,
                'message' => 'User already exist'
            ], 200);
        }

        // Create new user
        $register = Users::create([
            'email' => $request->email,
            'name' => $request->name,
            'password' => bcrypt($request->password)
        ]);
        if (!$register) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong on user creation'
            ], 500);
        }

        // Check if user successfully created
        $user = Users::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong on user insertion'
            ], 500);
        }

        // DONE
        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'user' => $user
        ], 200);
    }
    public function signIn(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find user data
        $user = Users::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Check if user is active
        if ($user->token != null) {
            return response()->json([
                'success' => false,
                'message' => 'User already signed in',
                'token' => $user->token
            ], 200);
        }

        // Check password
        if (Hash::check($request->password, $user->password)) {
            // Create token
            $token = bin2hex(random_bytes(32));
            $createToken = Users::where('email', $request->email)->update([
                'token' => $token
            ]);
            if (!$createToken) {
                return response()->json([
                    'success' => false,
                    'message' => 'Something went wrong on token creation'
                ], 500);
            }

            // DONE
            return response()->json([
                'success' => true,
                'message' => 'Sign in successful',
                'user' => $user,
                'token' => $token
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid password'
            ], 401);
        }
    }

    public function checkToken(Request $request)
    {
        if ($request->bearerToken() != null) {
            $user = Users::where('token', $request->bearerToken())->first();
            if ($user) {
                return response()->json([
                    'success' => true,
                    'message' => 'Token valid',
                    'user' => $user
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Token invalid',
                    'user' => null
                ], 200);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'No token',
            ], 400);
        }
    }

    public function getUserById(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|integer'
        ]);
        $user = Users::where('id', $validatedData['user_id'])->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Get user successful',
            'user' => $user
        ], 200);
    }

    public function uploadPhoto(Request $request)
    {
        $user = Users::where('token', $request->bearerToken())->first();

        if ($user) {
            $validated = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,svg',
            ]);

            if ($validated) {
                if ($user->image && Storage::exists('public/photos/' . $user->image)) {
                    Storage::delete('public/photos/' . $user->image);
                }

                $photoPath = $request->file('image')->store('public/photos');
                $user->image = basename($photoPath);
                $user->save();

                if ($user->image && Storage::exists('public/photos/' . $user->image)) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Photo uploaded successfully',
                        'image' => $user->image
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Photo upload failed',
                        'image' => $user->image
                    ], 500);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid photo format or size'
                ], 422);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid token'
            ], 401);
        }
    }


    public function signOut(Request $request)
    {
        $user = Users::where('token', $request->bearerToken())->update([
            'token' => null
        ]);
        if ($user) {
            return response()->json([
                'success' => true,
                'message' => 'Sign out successful'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong on sign out'
            ], 500);
        }
    }
}
