<?php

namespace App\Http\Controllers;

use App\Http\Resources\Attachment\AttachmentResource;
use App\Models\Attachment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AttachmentController extends Controller
{
    public function index(Post $post)
    {
        return AttachmentResource::collection($post->attachments());
    }

    public function store(Request $request, Post $post)
    {
        $request->validate([
            "file" => "required|file"
        ]);

        return new AttachmentResource(Attachment::create([
            "path" => Storage::disk("public")->put("/posts/" . $post->id . "/attachments", $request->file("file")),
            "size" => $request->file("file")->getSize(),
            "post_id" => $post->id
        ])); 
    }

    public function show(Post $post, Attachment $attachment)
    {
        return new AttachmentResource($attachment);
    }
}
