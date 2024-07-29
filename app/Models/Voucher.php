<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'guest_id',
        'case_number',
        'days',
        'amount',
        'self_pay',
        'path',
        'motel_id',
        'rate_amount',
    ];
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function guests(): BelongsTo
    {
        return $this->belongsTo(Guest::class, 'guest_id', 'id', 'guests');
    }

    public function motels(): BelongsTo
    {
        return $this->belongsTo(Motel::class,'motel_id','id','motels');
    }

    public function payments(): HasOne
    {
        return $this->hasOne(Payments::class);
    }
}
