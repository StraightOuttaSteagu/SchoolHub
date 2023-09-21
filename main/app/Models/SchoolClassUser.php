<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolClassUser extends Model
{
    use HasFactory;

    protected $fillable = [
        "school_class_id", "user_id", "role"
    ];
}
