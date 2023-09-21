<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrganizationUser extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id", "organization_id", "role"
    ];

    public function scopeFromRelation(Builder $query, Organization $organization, User $user): Builder
    {
        return $query
            ->where("organization_id", "=", $organization->id)
            ->where("user_id", "=", $user->id);
    }
}
