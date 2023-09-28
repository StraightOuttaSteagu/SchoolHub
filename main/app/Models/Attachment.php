<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        "path", "size", "post_id", "assignment_submission_id"
    ];

    public function post() {
        return $this->belongsTo(Post::class);
    }

    public function assignment_submission() {
        return $this->belongsTo(AssignmentSubmission::class);
    }
}
