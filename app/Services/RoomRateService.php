<?php

namespace App\Services;

class RoomRateService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getRate($clientCount,$days,$roomType)
    {
        $rates = [
        [
            'id' => 1,
            'name' => 'standard',
            'rate' => [
                [
                    'id' => 1,
                    'person_capacity' => 1,
                    'room_count' => 1,
                    'per_night' => 150,
                    'per_week' => 650,
                ],
                [
                    'id' => 2,
                    'person_capacity' => 2,
                    'room_count' => 1,
                    'per_night' => 300,
                    'per_week' => 750,
                ],
                [
                    'id' => 3,
                    'person_capacity' => 3,
                    'room_count' => 1,
                    'per_night' => 450,
                    'per_week' => 750,
                ],
                [
                    'id' => 4,
                    'person_capacity' => 4,
                    'room_count' => 1,
                    'per_night' => 600,
                    'per_week' => 900,
                ],
                [
                    'id' => 5,
                    'person_capacity' => 5,
                    'room_count' => 1,
                    'per_night' => 750,
                    'per_week' => 900,
                ],
                [
                    'id' => 6,
                    'person_capacity' => 6,
                    'room_count' => 2,
                    'per_night' => 900,
                    'per_week' => 750,
                ]
            ]
        ],
        [
            'id' => 2,
            'name' => 'shared',
            'rate' => [
                [
                    'id' => 1,
                    'person_capacity' => 1,
                    'room_count' => 1,
                    'per_night' => 150,
                    'per_week' => 400,
                ],
                [
                    'id' => 2,
                    'person_capacity' => 2,
                    'room_count' => 1,
                    'per_night' => 300,
                    'per_week' => 750,
                ],
                [
                    'id' => 3,
                    'person_capacity' => 3,
                    'room_count' => 1,
                    'per_night' => 450,
                    'per_week' => 750,
                ],
                [
                    'id' => 4,
                    'person_capacity' => 4,
                    'room_count' => 1,
                    'per_night' => 600,
                    'per_week' => 900,
                ],
                [
                    'id' => 5,
                    'person_capacity' => 5,
                    'room_count' => 1,
                    'per_night' => 750,
                    'per_week' => 900,
                ],
                [
                    'id' => 6,
                    'person_capacity' => 6,
                    'room_count' => 2,
                    'per_night' => 900,
                    'per_week' => 750,
                ]
            ]
        ]
    ];
        foreach($rates as $item){
            if($item['name'] === $roomType){
                foreach($item['rate'] as $rate){
                    if($rate['person_capacity'] === $clientCount){
                       if($days < 7){
                            return $rate['per_night'];
                       }else{
                            return $rate['per_week'];
                       }
                    }
                }
             }
        
        }
    }
}
