<?php

namespace App\Http\Controllers;

use App\Models\Motel;
use App\Models\Role;
use Illuminate\Validation\Rules;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role as SpatieRole;

class AddMotelUserController extends Controller
{
    public function store(Request $request, Motel $motel)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|lowercase|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'selectedRole' => 'required'
        ]);
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);
        $user->motels()->attach($motel->id);
        $role = SpatieRole::findOrCreate($request->selectedRole);
        $user->assignRole($role);
        return back();
    }
}
