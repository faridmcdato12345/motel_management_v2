<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Motel>
 */
class MotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'motel_name' => fake()->name(),
            'motel_address' => fake()->address(),
            'phone_number' => fake()->phoneNumber(),
            'email_address' => fake()->unique()->safeEmail(),
        ];
    }
}
