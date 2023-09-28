<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        "title", "content", "deadline", "school_class_id", "user_id", "type"
    ];

    public function school_class() {
        return $this->belongsTo(SchoolClass::class);
    }

    public function attachments() {
        return $this->hasMany(Attachment::class);
    }

    public function assignment_submissions() {
        return $this->hasMany(AssignmentSubmission::class);
    }
}
