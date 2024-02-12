<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
            ], 400);
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

        // Check password
        if (Hash::check($request->password, $user->password)) {
            // Create token
            $token = md5($request->email . $request->password);
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
                ], 401);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'No token',
            ], 401);
        }
    }
}
