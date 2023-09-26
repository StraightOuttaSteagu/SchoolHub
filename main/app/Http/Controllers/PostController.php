<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\SchoolClass;
use App\Models\SchoolClassUser;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(SchoolClass $class)
    {
        return Post::where("school_class_id", "=", $class->id)->get();
    }

    public function store(Request $request, SchoolClass $class)
    {
        return Post::create([
            ...$request->validate([
                "title" => "required|min:1|max:255",
                "content" => "required|max:1000",
                "deadline" => "bail|nullable|date|after:now"
            ]),
            "school_class_id" => $class->id,
            "user_id" => auth()->user()->id
        ]);
    }

    public function show(SchoolClass $class, Post $post)
    {
        return $post;
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
