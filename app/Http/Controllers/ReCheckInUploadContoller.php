<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Booking;
use App\Models\GuestType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReCheckInUploadContoller extends Controller
{
    public function index(Room $room)
    {
        return inertia('Upload/Index',[
            'guestTypes' => GuestType::where('user_id',auth()->user()->id)->get(),
            'room' => $room,
            'recheckin' => true
        ]);
    }

    public function update(Request $request, Room $room)
    {
        try {
            DB::beginTransaction();
            $room->update($request->all());
            Booking::where('room_id',$room->id)->update([
                'check_in_date' => $request->check_in_date,
                'check_out_date' => $request->check_out_date
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json($e->getMessage());
        }
    }
}
