<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        "value", "user_id", "school_class_id"
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function school_class() {
        return $this->belongsTo(SchoolClass::class);
    }
}
