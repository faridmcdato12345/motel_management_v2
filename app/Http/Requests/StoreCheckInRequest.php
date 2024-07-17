<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCheckInRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'motel_id' => $this->motel_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'phone_number' => $this->phone_number,
            'checked_in' => $this->checked_in,
            'checked_out' => $this->checked_out,
            'voucher_days' => $this->voucher_days,
            'case_number' => $this->case_number,
            'voucher_amount' => $this->voucher_amount,
            'self_pay' => $this->self_pay,
            'room_number' => $this->room_number,
        ];
    }
}
