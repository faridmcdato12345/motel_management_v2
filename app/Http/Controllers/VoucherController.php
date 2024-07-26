<?php

namespace App\Http\Controllers;
use DateTime;
use App\Models\Room;
use App\Models\Guest;
use App\Models\Booking;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreVoucherRequest;
use App\Http\Resources\VoucherResource;
use App\Models\Motel;

class VoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Voucher::query();
        if($request->has('case_number')){
            $query->where('case_number','like','%' . $request->query('case_number') . '%');
        }
        $limit = $request->has('query') ? $request->query('query'): 5;
        if(auth()->user()->hasRole('Super Admin')){
             $vouchers = $query->paginate(intval($limit))->withQueryString();
        }else{
            $vouchers = $query->where('user_id',auth()->user()->id)->paginate(intval($limit))->withQueryString();
        }
        return inertia('Voucher/Index',[
            'queryLimit' => intval($limit),
            'queryName' => $request->has('name') ? $request->query('name') : null,
            'vouchers' => $vouchers
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
    public function store(StoreVoucherRequest $request)
    {
        try {
            Voucher::create($request->validated());
            return back();
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Voucher $voucher)
    {
        $vouchers = Voucher::with('guests','motels')->where('id',$voucher->id)->first();
        return response()->json($vouchers);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voucher $voucher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voucher $voucher)
    {
        $voucher->update($request->all());
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voucher $voucher)
    {
        $voucher->delete();
        return back();
    }

    public function all(Request $request)
    {
        try {
            return inertia('Voucher/All',[
                'vouchers' => VoucherResource::collection(Voucher::with('motels','guests')->get())
            ]);
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }
    public function storeMultiClient(Request $request, Room $room)
    {
        $motelId = Motel::select('id','motel_name')->where('motel_name','LIKE','%'.$request->motel_name.'%')->first();
        try {
            DB::beginTransaction();
            if(count($request->clients) == 1){
                $nameParts = explode(' ',$request->clients[0]);
                $guest = Guest::create([
                    'user_id' => auth()->user()->id,
                    'first_name' => $nameParts[0],
                    'last_name' => $nameParts[1]
                ]);
                Voucher::create([
                    'user_id' => auth()->user()->id,
                    'guest_id' => $guest->id,
                    'case_number' => $request->case_number[0],
                    'days' => $request->days,
                    'amount' => $request->total,
                    'self_pay' => $request->contribution,
                    'path' => $request->image_path,
                    'motel_id' => $motelId->id,
                    'rate_amount' => $request->rate_amount[0]
                ]);
                Booking::create([
                    'room_id' => $room->id,
                    'guest_id' => $guest->id,
                    'check_in_date' => $request->check_in,
                    'check_out_date' => $request->check_out,
                    'total_price' => $request->total_amount,
                    'status' => 'checked_in'
                ]);
                if($request->added_room){
                    Booking::create([
                        'room_id' => $request->added_room,
                        'guest_id' => $guest->id,
                        'check_in_date' => $request->check_in,
                        'check_out_date' => $request->check_out,
                        'total_price' => $request->total_amount,
                        'status' => 'checked_in'
                    ]);
                    Room::where('user_id',auth()->user()->id)->where('id',$request->added_room)->update(['is_occupied' => 1,'status' => 'In Use']);
                }
                $rooms = Room::where('user_id',auth()->user()->id)->where('id',$room->id)->get();
                foreach($rooms as $room)
                {
                    if($room->maximum_capacity >= $room->capacity_status){
                        $room->capacity_status += 1;
                        $room->status = 'In Use';
                        $room->save();
                    }
                }
            }else if(count($request->clients ) > 1){
                for($i = 0; $i < count($request->clients); $i++){
                    $nameParts = explode(' ',$request->clients[$i]);
                    $guest = Guest::create([
                        'user_id' => auth()->user()->id,
                        'type_id' => $request->type[$i],
                        'first_name' => $nameParts[0],
                        'last_name' => $nameParts[1]
                    ]);
                    Voucher::create([
                        'user_id' => auth()->user()->id,
                        'guest_id' => $guest->id,
                        'case_number' => $request->case_number[0],
                        'days' => $request->days,
                        'amount' => $request->total,
                        'self_pay' => $request->contribution,
                        'path' => $request->image_path,
                        'motel_id' => $motelId->id,
                        'rate_amount' => $request->rate_amount[$i]
                    ]);
                    Booking::create([
                        'room_id' => $room->id,
                        'guest_id' => $guest->id,
                        'check_in_date' => $request->check_in,
                        'check_out_date' => $request->check_out,
                        'total_price' => $request->total_amount,
                        'status' => 'checked_in'
                    ]);
                }
                Room::where('user_id',auth()->user()->id)->where('id',$room->id)->update(['is_occupied' => 1,'status' => 'In Use']);
            }
            DB::commit();
            return redirect()->back();
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json($th->getMessage());
        }
        
        
    }

}
