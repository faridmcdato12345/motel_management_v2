<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GuestType extends Model
{
    use HasFactory;

    protected $fillable = ['name','status','user_id'];

    public function guests(): HasMany
    {
        return $this->hasMany(Guest::class);
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
