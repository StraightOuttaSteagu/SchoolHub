<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        "name"
    ];

    public function users(): HasManyThrough {
        return $this->hasManyThrough(User::class, OrganizationUser::class);
    }

    public function classes(): HasMany {
        return $this->hasMany(SchoolClass::class);
    }
}
