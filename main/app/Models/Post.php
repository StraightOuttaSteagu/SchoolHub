<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        "title", "content", "deadline", "school_class_id", "user_id"
    ];
}
