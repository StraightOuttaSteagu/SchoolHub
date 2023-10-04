<?php

namespace App\Http\Controllers;

use App\Http\Resources\Attachment\AttachmentResource;
use App\Models\AssignmentSubmission;
use App\Models\Attachment;
use App\Models\SchoolClassUser;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class AssignmentSubmissionController extends Controller
{
    public function index(Request $request, Post $post) {
        $classUser = SchoolClassUser::query()
            ->where("school_class_id", "=", $post->school_class()->id)
            ->where("user_id", "=", $request->user()->id)
            ->firstOrFail();

        if ($classUser->role === "teacher")
            return $post->assignment_submissions()->get();
        return AssignmentSubmission::query()
                ->where("user_id", "=", $request->user()->id)
                ->where("post_id", "=", $post->id)
                ->firstOrFail();
    }

    public function store(Request $request, Post $post) {
        // authorize
        $classUser = SchoolClassUser::query()
            ->where("school_class_id", "=", $post->school_class()->id)
            ->where("user_id", "=", $request->user()->id)
            ->firstOrFail();
        if ($classUser->role !== "student") 
            return response("you are not a student", 401);

        if (AssignmentSubmission::query()
                ->where("user_id", "=", $request->user()->id)
                ->where("post_id", "=", $post->id)
                ->count() > 0)
            return response("you've already submitted", 401);
        
        return AssignmentSubmission::create([
            "user_id" => $request->user()->id,
            "post_id" => $post->id
        ]);
    }

    public function changeStatus(
        Post $post, 
        AssignmentSubmission $submission
    ) {
        return $submission->update([
            "submitted" => !$submission->submitted
        ]);
    }

    public function storeAttachment(
        Request $request, 
        Post $post, 
        AssignmentSubmission $submission
    ) {
        $request->validate([
            "file" => "required|file"
        ]);

        return new AttachmentResource(Attachment::create([
            "path" => Storage::disk("public")->put("/posts/" . $post->id . "/attachments", $request->file("file")),
            "size" => $request->file("file")->getSize(),
            "post_id" => $post->id,
            "assignment_submission_id" => $submission->id
        ])); 
    }

    public function deleteAttachment(
        Post $post, 
        AssignmentSubmission $submission,
        Attachment $attachment
    ) {
        $attachment->delete();
    }
}
