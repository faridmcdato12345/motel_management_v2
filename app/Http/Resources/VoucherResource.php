<?php

namespace App\Http\Resources;

use App\Models\Guest;
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
        return [
            'id' => $this->id,
            'guest' => GuestResource::collection($this->whenLoaded('guests')),
            'case_number' => $this->case_number,
            'days' => $this->days,
            'amount' => $this->amount,
            'self_pay' => $this->self_pay,
            'path' => $this->path
        ];
    }
}
