<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuestRequest extends FormRequest
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
            'user_id' => 'required',
            'type_id' => 'required',
            'first_name' => 'required',
            'last_name' => 'nullable',
            'phone_number' => 'nullable'
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'Guest first name is required.'
        ];
    }
}
