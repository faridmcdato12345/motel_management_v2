<?php

namespace App\Services;

use Carbon\Carbon;

class GetDaysService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        
    }

    public function numberOfDays($dates)
    {

        $fromDate = Carbon::createFromFormat('m/d/y', $dates[0]);
        $toDate = Carbon::createFromFormat('m/d/y', $dates[1]);

        return $fromDate->diffInDays($toDate) + 1;
    }
}
