<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Models\Motel;
use App\Models\Role;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $roles = Role::all();
        $motels = Motel::all();
        $query = User::query();
        if($request->has('name')){
            $query->where('name','like','%' . $request->query('name') . '%');
        }
        $limit = $request->has('query') ? $request->query('query'): 5;
        $users = $query->with('motels')->paginate(intval($limit))->withQueryString();
        return inertia('User/Index',[
            'queryLimit' => intval($limit),
            'queryName' => $request->has('name') ? $request->query('name') : null,
            'users' => $users,
            'motels' => $motels,
            'roles' => $roles
        ]);
    }
    public function store(Request $request)
    {

    }
    public function show($id)
    {
        $user = User::with('motels')->findOrFail($id);
        return response()->json($user);
    }
    public function update(UpdateUserRequest $request, User $user, Motel $motel)
    {
        try{
            $user->motels()->sync($motel->id);
            $user->update($request->validated());
            return back();
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }
    public function destroy(User $user)
    {
        $user->delete();
        return back();
    }

    public function home()
    {
        $user = User::findOrFail(auth()->user()->id);
        $data = $user->with('vouchers')->get();
        return inertia('User/Home',[
            'guests' => $data
        ]);
    }
}
