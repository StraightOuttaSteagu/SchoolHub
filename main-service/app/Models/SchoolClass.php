<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    use HasFactory;

    protected $fillable = [
        "name", "description", 
        "identifier", "subject", "theme", "icon",
        "organization_id", "creator_id"
    ];

    public function organization() {
        return $this->belongsTo(Organization::class);
    }

    public function users() {
        return $this->hasManyThrough(User::class, SchoolClassUser::class);
    }

    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function grades() {
        return $this->hasMany(Grade::class);
    }
    
    public function creator() {
        return $this->belongsTo(User::class);
    }
}
