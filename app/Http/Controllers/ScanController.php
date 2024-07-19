<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\GuestType;
use Illuminate\Http\Request;

class ScanController extends Controller
{
    public function index(Room $room)
    {
        return inertia('Scan/Index',[
            'guestTypes' => GuestType::where('user_id',auth()->user()->id)->get(),
            'room' => $room
        ]);
    }
}
