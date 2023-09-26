<?php

use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\SchoolClassController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::post("/login", function (Request $request) {
    $credentials = $request->validate([
        "email" => "required|email",
        "password" => "required"
    ]);

    if (!Auth::attempt($credentials))
        return response("", 401);

    return User
        ::where("email", "=", $credentials["email"])
        ->first()
        ->createToken("API_TOKEN")
        ->plainTextToken;
})->name("postman.login");

Route::middleware("auth:sanctum")->group(function () {
    // organizations
    Route::apiResource(
        "organizations",
        OrganizationController::class
    );
    Route::post(
        "/organizations/{organization}/student/{user}",
        [OrganizationController::class, "addStudent"]
    )->name("organizations.addStudent");
    Route::post(
        "/organizations/{organization}/teacher/{user}",
        [OrganizationController::class, "addTeacher"]
    )->name("organizations.addTeacher");
    Route::delete(
        "/organizations/{organization}/user/{user}",
        [OrganizationController::class, "removeUser"]
    )->name("organizations.removeUser");

    // classes
    Route::apiResource(
        "organizations.classes",
        SchoolClassController::class
    )->scoped();
    Route::post(
        "/organizations/{organization}/classes/{class}/student/{user}",
        [SchoolClassController::class, "addStudent"]
    )->name("organizations.classes.addStudent");
    Route::post(
        "/organizations/{organization}/classes/{class}/teacher/{user}",
        [SchoolClassController::class, "addTeacher"]
    )->name("organizations.classes.addTeacher");
    Route::delete(
        "/organizations/{organization}/classes/{class}/user/{user}",
        [SchoolClassController::class, "removeUser"]
    )->name("organizations.classes.removeUser");

    // posts
    Route::apiResource(
        "classes.posts",
        \App\Http\Controllers\PostController::class
    )->scoped();
});
