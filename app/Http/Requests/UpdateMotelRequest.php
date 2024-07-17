<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMotelRequest extends FormRequest
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
            'motel_name' => 'required',
            'motel_address' => 'required',
            'phone_number' => 'nullable',
            'email_address' => 'nullable',
            'status' => 'nullable'
        ];
    }

    public function messages()
    {
        return [
            'motel_name.required' => 'Motel name is required.',
            'motel_name.unique' => 'Motel name has been registered.',
            'motel_address.required' => 'Motel address is required',
        ];
    }
}
