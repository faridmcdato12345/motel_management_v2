<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\GuestType;
use Illuminate\Http\Request;

class ScanController extends Controller
{
    public function index()
    {
        return inertia('Scan/Index',[
            'guestTypes' => GuestType::where('user_id',auth()->user()->id)->get(),
            'roomNumbers' => Room::where('user_id',auth()->user()->id)->where('is_occupied',0)->get()
        ]);
    }
}
