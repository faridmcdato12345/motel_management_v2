<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use function PHPSTORM_META\map;

class StoreRoomRequest extends FormRequest
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
            'room_number' => 'required',
            'rate_id' => 'required',
            'room_type_id'=> 'required',
            'motel_id' => 'nullable',
            'is_occupied' => 'nullable',
            'status' => 'nullable'
        ];
    }

    public function messages()
    {
        return [
            'room_number.required' => 'Room number is required.',
            'rate_id.required' => 'Room rate is required.',
            'room_type_id.required' => 'Room type is required.',
        ];
    }
}
