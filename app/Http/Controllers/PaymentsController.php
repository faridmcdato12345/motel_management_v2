<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Voucher;
use App\Models\Payments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\VoucherResource;

class PaymentsController extends Controller
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
        $limit = $request->has('query') ? $request->query('query'): 10;
        $vouchers = $query->with('payments','motels')
                            ->paginate(intval($limit))
                            ->withQueryString();
        return inertia('Payment/Index',[
            'queryLimit' => intval($limit),
            'queryName' => $request->has('case_number') ? $request->query('case_number') : null,
            'vouchers' => VoucherResource::collection($vouchers)
        ]);
    }

    public function searchPa(Request $request)
    {
        
        try {
            $query = $request->get('case_number');
            if ($query) {
                $searchResults = Voucher::with('guests.bookings','payments')->where('case_number', 'like', '%' . $query . '%')->get(); // Adjust this query to fit your needs
            } else {
                $searchResults = [];
            }

            return response()->json(VoucherResource::collection($searchResults));
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
        
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
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $voucher = Voucher::select('id','amount')->where('id',$request->id)->first();
            Payments::create([
                'voucher_id' => $request->id,
                'paid_amount' => $request->payment,
                'payment_date' => Carbon::now('America/New_York'),
                'status' => $voucher->amount > $request->payment ? 'Balance' : 'Paid',
            ]);
            $payments = Payments::where('voucher_id',$request->id)->where('status','Balance')->sum('paid_amount');
            if($voucher->amount == $payments){
                $queries = Payments::where('voucher_id',$request->id)->where('status','Balance')->get();
                foreach ($queries as $query) {
                    $query->update(['status' => 'Paid']);
                }
            }
            DB::commit();
            return back();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json($e->getMessage());
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Payments $payments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payments $payments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payments $payments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payments $payments)
    {
        //
    }
}
