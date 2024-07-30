<?php

namespace App\Http\Resources;

use App\Models\Guest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VoucherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $balance = $this->amount;
        
        if($this->whenLoaded('payments')){
            $totalPaid = $this->payments->sum('paid_amount');
            $balance -= $totalPaid;
        }else{
            $balance = 0;
        }

        return [
            'id' => $this->id,
            'guest' => new GuestResource($this->whenLoaded('guests')),
            'case_number' => $this->case_number,
            'days' => $this->days,
            'amount' => $this->amount,
            'self_pay' => $this->self_pay,
            'rate_amount' => $this->rate_amount,
            'path' => $this->path,
            'created_at' =>  Carbon::parse($this->created_at)->isoFormat('MMMM D YYYY'),
            'motel' => $this->whenLoaded('motels'),
            'payment' => $this->whenLoaded('payments'),
            'balance' => $balance
        ];
    }
}
