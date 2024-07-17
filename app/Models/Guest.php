<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Guest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type_id',
        'first_name',
        'last_name',
        'phone_number'
    ];

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id','id','users');
    }

    public function types(): BelongsTo
    {
        return $this->belongsTo(GuestType::class,'type_id','id','guest_types');
    }

    public function vouchers(): HasMany
    {
        return $this->hasMany(Voucher::class);
    }
}
