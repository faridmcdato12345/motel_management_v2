<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\GuestType;
use Illuminate\Http\Request;
use App\Http\Requests\StoreGuestTypeRequest;

class GuestTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = GuestType::query();
        if($request->has('name')){
            $query->where('name','like','%' . $request->query('name') . '%');
        }
        $limit = $request->has('query') ? $request->query('query'): 5;
        $types = $query->where('user_id',auth()->user()->id)->paginate(intval($limit))->withQueryString();
        return inertia('Guest/Type/Index',[
            'queryLimit' => intval($limit),
            'queryName' => $request->has('name') ? $request->query('name') : null,
            'types' => $types
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
    public function store(StoreGuestTypeRequest $request)
    {
        try {
            auth()->user()->guestTypes()->create($request->validated());
            GuestType::create($request->validated());
            return response()->json(['message' => 'Success! Guest type has been created.']);
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(GuestType $guestType)
    {
        return response()->json($guestType);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GuestType $guestType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreGuestTypeRequest $request, GuestType $guestType)
    {
        try {
            $guestType->update($request->validated());
            return back();
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GuestType $guestType)
    {
        $guestType->delete();
        return back();
    }

    public function showAll()
    {
        dd(auth()->user());
        return response()->json(GuestType::where('user_id',auth()->user()->id)->get());
    }
}
