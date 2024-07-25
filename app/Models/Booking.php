<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Payments;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'guest_id',
        'check_in_date',
        'check_out_date',
        'total_price',
        'status',
        'manual_check_out'
    ];

    public function rooms(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function guests(): BelongsTo
    {
        return $this->belongsTo(Guest::class,'guest_id','id','guests');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payments::class);
    }
}
