<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'rate_id' => 1,
            'room_type_id' => 1,
            'room_number' => '',
            'is_occupied' => 0,
            'status' => $this->faker->randomElement(['Available','In Use','Out of Service','Shared','Checked Out'])
        ];
    }
    /**
     * Set the room number incrementally.
     *
     * @param int $index
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withRoomNumber(int $index): Factory
    {
        return $this->state(function (array $attributes) use ($index) {
            return [
                'room_number' => $index + 1,
            ];
        });
    }
}
