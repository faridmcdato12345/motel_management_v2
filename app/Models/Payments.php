<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payments extends Model
{
    use HasFactory;

    protected $fillable = [
        'voucher_id',
        'paid_amount',
        'payment_date',
        'status'
    ];

    public function vouchers(): BelongsTo
    {
        return $this->belongsTo(Voucher::class);
    }
}
