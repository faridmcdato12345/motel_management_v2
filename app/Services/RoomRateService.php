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
        $rates = config('rate.key');
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
