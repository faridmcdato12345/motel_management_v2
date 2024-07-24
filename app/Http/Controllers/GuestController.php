<?php

namespace App\Http\Controllers;

use DateTime;
use Exception;
use App\Models\Room;
use App\Models\Guest;
use App\Models\Booking;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\GuestResource;
use App\Http\Requests\StoreGuestRequest;

class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Guest::query();
        if($request->has('name')){
            $query->where('name','like','%' . $request->query('name') . '%');
        }
        $limit = $request->has('query') ? $request->query('query'): 5;
        $guests = $query->paginate(intval($limit))->withQueryString();
        //return $guests;
        return inertia('Guest/Index',[
            'queryLimit' => intval($limit),
            'queryName' => $request->has('name') ? $request->query('name') : null,
            'guests' => $guests,
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
    public function store(StoreGuestRequest $request)
    {
        try {
            Guest::create($request->validated());
            return back();
        } catch (Exception $e) {
            return response()->json($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Guest $guest)
    {
        return response()->json($guest);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guest $guest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Guest $guest)
    {
        $guest->update($request->all());
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guest $guest)
    {
        //
    }

    public function storeBulk(Request $request, Room $room)
    {
        try {
            DB::beginTransaction();
            foreach ($request->all() as $payload) {
                $nameParts = explode(' ',$payload['client']);
                $checkInDateString = $payload['dates'][0];
                $checkOutDateString = $payload['dates'][1];
                $checkInDate = DateTime::createFromFormat('m/d/y',$checkInDateString);
                $checkOutDate = DateTime::createFromFormat('m/d/y',$checkOutDateString);
                $guest = Guest::create([
                    'user_id' => auth()->user()->id,
                    'type_id' => $payload['type'],
                    'first_name' => $nameParts[0],
                    'last_name' => $nameParts[1]
                ]);
                Voucher::create([
                    'user_id' => auth()->user()->id,
                    'guest_id' => $guest->id,
                    'case_number' => $payload['case_number'],
                    'days' => $payload['days'],
                    'amount' => $payload['amount'],
                    'self_pay' => $payload['contribution'],
                    'path' => $payload['image_path']
                ]);
                Booking::create([
                    'room_id' => $payload['room_number'],
                    'guest_id' => $guest->id,
                    'check_in_date' => $checkInDate->format('Y-m-d'),
                    'check_out_date' => $checkOutDate->format('Y-m-d'),
                    'total_price' => $payload['total_amount'],
                    'status' => 'checked_in'
                ]);
                Room::where('user_id',auth()->user()->id)->where('room_number',$payload['room_number'])->update(['is_occupied' => 1]);
            }
            DB::commit();
            
            return redirect()->route('user.home');
            
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json($e->getMessage());
        }
        
    }
}
