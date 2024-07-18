<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ShareInertiaData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
                return $user ? [
                    'user' => $user->only('id', 'name', 'email'),
                    'permissions' => $user->getAllPermissions()->pluck('name'),
                ] : null;
            },
        ]);

        return $next($request);
    }
}
