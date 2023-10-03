<?php

namespace App\Http\Controllers;

use App\Http\Resources\Post\PostResource;
use App\Models\Post;
use App\Models\SchoolClass;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request, SchoolClass $class)
    {
        $query = Post::where("school_class_id", "=", $class->id);
        if (
            isset($request->type) && 
            (
                $request->type === "announcement" ||
                $request->type === "assignment"
            )
        )
            $query = $query->where("type", "=", $request->type);
        return PostResource::collection($query->get());
    }

    public function store(Request $request, SchoolClass $class)
    {
        return new PostResource(Post::create([
            ...$request->validate([
                "title" => "required|min:1|max:255",
                "content" => "required|max:1000"
            ]),
            "deadline" => $request->type === "assignment" ? $request->deadline : null,
            "type" => $request->type === "assignment" ? "assignment" : "announcement",
            "school_class_id" => $class->id,
            "user_id" => auth()->user()->id
        ]));
    }

    public function show(SchoolClass $class, Post $post)
    {
        return new PostResource($post);
    }

    public function update(Request $request, SchoolClass $class, Post $post)
    {
        $post->update([
            "title" => "required|min:1|max:255",
            "content" => "required|max:1000",
            "deadline" => "bail|nullable|date|after:now"
        ]);
    }

    public function destroy(SchoolClass $class, Post $post)
    {
        $post->delete();
    }
}
