<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMotelRequest;
use App\Http\Requests\UpdateMotelRequest;
use App\Http\Resources\MotelResource;
use App\Models\Motel;
use Illuminate\Http\Request;

class MotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Motel::query();
        if($request->has('name')){
            $query->where('product_name','like','%' . $request->query('name') . '%');
        }
        $limit = $request->has('query') ? $request->query('query'): 5;
        $motels = $query->paginate(intval($limit))->withQueryString();
        //dd(MotelResource::collection($motels));
        return inertia('Motel/Index',[
            'userRoles' => $request->user_roles,
            'userPermissions' => $request->user_permissions,
            'user' => auth()->user(),
            'queryLimit' => intval($limit),
            'queryName' => $request->has('name') ? $request->query('name') : null,
            'motels' => $motels
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMotelRequest $request)
    {
        try {
            Motel::create($request->validated());
            return response()->back();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Motel $motel)
    {
        return response()->json($motel);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Motel $motel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMotelRequest $request, Motel $motel)
    {
        try {
            $motel->update($request->validated());
            return back();
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Motel $motel)
    {
        $motel->delete();
        return back();
    }
}
