<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Motel;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\VoucherResource;
use App\Http\Requests\UpdateUserRequest;
use Spatie\Permission\Models\Role as ModelsRole;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $motels = Motel::all();
        $query = User::query();
        if($request->has('name')){
            $query->where('name','like','%' . $request->query('name') . '%');
        }
        $limit = $request->has('query') ? $request->query('query'): 5;
        $users = $query->with('motels')->paginate(intval($limit))->withQueryString();
        return inertia('User/Index',[
            'roles' => auth()->user()->getRoleNames(),
            'permissions' => auth()->user()->getAllPermissions()->pluck('name'),
            'queryLimit' => intval($limit),
            'queryName' => $request->has('name') ? $request->query('name') : null,
            'users' => $users,
            'motels' => $motels,
            'theRoles' => Role::all()
        ]);
    }
    public function store(Request $request)
    {

    }
    public function show($id)
    {
        $user = User::with('motels','roles')->findOrFail($id);
        return response()->json($user);
    }
    public function update(UpdateUserRequest $request, User $user, Motel $motel)
    {

        try{
            DB::beginTransaction();
            $user->motels()->sync($motel->id);
            $role = ModelsRole::findOrCreate($request->selectedRole);
            $user->syncRoles($role);
            $user->update($request->validated());
            DB::commit();
            return back();
        } catch (\Exception $e) {
            DB::rollback();
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
        $vouchers = Voucher::with('guests.types','guests.bookings')->where('user_id',auth()->user()->id)->get();
        return inertia('User/Home',[
            'vouchers' => $vouchers
        ]);
    }
}
