<?php

namespace App\Http\Controllers;

use App\Http\Resources\Organization\OrganizationResource;
use App\Http\Resources\Organization\PublicOrganizationResource;
use App\Models\Organization;
use App\Models\OrganizationUser;
use App\Models\User;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function __construct() {
        $this->authorizeResource(Organization::class);
    }

    public function index()
    {
        return PublicOrganizationResource::collection(OrganizationUser
            ::where("user_id", "=", auth()->user()->id)
            ->get()
            ->map(fn (OrganizationUser $organizationUser) =>
                Organization::find($organizationUser->id)
            )
        );
    }

    public function store(Request $request)
    {
        $organization = Organization::create($request->validate([
            "name" => "required|min:1|max:255"
        ]));

        OrganizationUser::create([
            "organization_id" => $organization->id,
            "user_id" => auth()->user()->getAuthIdentifier(),
            "role" => "admin"
        ]);
    }

    public function show(Organization $organization)
    {
        if (OrganizationUser
                ::fromRelation($organization, auth()->user())
                ->first()
                ->role === "student")
            return new PublicOrganizationResource($organization);
        return new OrganizationResource($organization);
    }

    public function update(Request $request, Organization $organization)
    {
        $organization->update($request->validate([
            "name" => "required|min:1|max:255"
        ]));
    }

    public function destroy(Organization $organization)
    {
        $organization->delete();
    }

    public function addStudent(Organization $organization, User $user) {
        $this->authorize("addUser", [$organization, $user]);
        OrganizationUser::create([
            "organization_id" => $organization->id,
            "user_id" => $user->id,
            "role" => "student"
        ]);
    }

    public function addTeacher(Organization $organization, User $user) {
        $this->authorize("addUser", [$organization, $user]);
        OrganizationUser::create([
            "organization_id" => $organization->id,
            "user_id" => $user->id,
            "role" => "teacher"
        ]);
    }

    public function removeUser(Organization $organization, User $user) {
        $this->authorize("removeUser", [$organization, $user]);
        OrganizationUser::fromRelation($organization, $user)->delete();
    }
}
