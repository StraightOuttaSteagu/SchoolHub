<?php

namespace App\Http\Controllers;

use App\Http\Resources\Grade\GradeResource;
use App\Models\Grade;
use App\Models\SchoolClass;
use App\Models\User;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    public function index(SchoolClass $class)
    {
        return GradeResource::collection($class->grades()->get());
    }

    public function store(Request $request, SchoolClass $class)
    {
        $request->validate([
            "student_id" => "required|numeric",
            "value" => "required|numeric|min:1|max:10"
        ]);

        $student = User::findOrFail($request->student_id);

        return new GradeResource(Grade::create([
            "student_id" => $student->id,
            "school_class_id" => $class->id,
            "value" => $request->value
        ]));
    }

    public function show(SchoolClass $class, Grade $grade)
    {
        return new GradeResource($grade);
    }

    public function update(Request $request, SchoolClass $class, Grade $grade)
    {
        $grade->update($request->validate([
            "value" => "required|numeric|min:1|max:10"
        ]));
    }

    public function destroy(SchoolClass $class, Grade $grade)
    {
        $grade->delete();
    }
}
