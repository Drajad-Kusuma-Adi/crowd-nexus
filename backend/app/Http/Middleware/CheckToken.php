<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Users;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        $user = Users::where('token', $token)->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Token invalid',
                'invalid_token' => $request->bearerToken()
            ], 401);
        } else {
            return $next($request);
        }
    }
}
