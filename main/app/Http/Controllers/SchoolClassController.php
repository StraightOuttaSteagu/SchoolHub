<?php

namespace App\Http\Controllers;

use App\Http\Resources\Class\ClassResource;
use App\Http\Resources\Class\PublicClassResource;
use App\Models\Organization;
use App\Models\SchoolClass;
use App\Models\SchoolClassUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class SchoolClassController extends Controller
{
    public function index(Organization $organization) {
        Gate::authorize("view-all-classes", $organization);
        return PublicClassResource::collection(
            $organization->classes()->get()
        );
    }

    public function store(
        Request $request,
        Organization $organization
    ) {
        Gate::authorize("store-class", $organization);
        return new ClassResource(SchoolClass::create([
            ...$request->validate([
                "name" => "required|min:1|max:255",
                "description" => "nullable"
            ]),
            "organization_id" => $organization->id
        ]));
    }

    public function show(
        Organization $organization,
        SchoolClass $class
    ) {
        Gate::authorize("show-class", [$organization, $class]);
        return new ClassResource($class);
    }

    public function update(
        Request $request,
        Organization $organization,
        SchoolClass $class
    ) {
        Gate::authorize("update-class", [$organization, $class]);
        return new ClassResource($class->update($request->validate([
            "name" => "required|min:1|max:255",
            "description" => "nullable"
        ])));
    }

    public function destroy(
        Organization $organization,
        SchoolClass $class
    ) {
        Gate::authorize("delete-class", [$organization, $class]);
        $class.delete();
    }

    public function addStudent(
        Organization $organization,
        SchoolClass $class,
        User $user
    ) {
        Gate::authorize("class-user", [$organization, $class, $user]);
        SchoolClassUser::create([
            "school_class_id" => $class->id,
            "user_id" => $user->id,
            "role" => "student"
        ]);
    }

    public function addTeacher(
        Organization $organization,
        SchoolClass $class,
        User $user
    ) {
        Gate::authorize("class-user", [$organization, $class, $user]);
        SchoolClassUser::create([
            "school_class_id" => $class->id,
            "user_id" => $user->id,
            "role" => "teacher"
        ]);
    }

    public function removeUser(
        Organization $organization,
        SchoolClass $class,
        User $user
    ) {
        Gate::authorize("class-user", [$organization, $class, $user]);
        SchoolClassUser::query()
            ->where("school_class_id", "=", $class->id)
            ->where("user_id", "=", $user->id)
            ->first()->delete();
    }
}
