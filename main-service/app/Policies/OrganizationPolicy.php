<?php

namespace App\Policies;

use App\Models\Organization;
use App\Models\OrganizationUser;
use App\Models\User;

class OrganizationPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Organization $organization): bool
    {
        return OrganizationUser::query()
                ->fromRelation($organization, $user)
                ->count() > 0;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Organization $organization): bool
    {
        $organizationUser = OrganizationUser::query()->fromRelation($organization, $user);
        return $organizationUser->count() > 0 && $organizationUser->first()->role !== "student";
    }

    public function delete(User $user, Organization $organization): bool
    {
        $organizationUser = OrganizationUser::query()->fromRelation($organization, $user);
        return $organizationUser->count() > 0 && $organizationUser->first()->role !== "student";
    }

    public function restore(User $user, Organization $organization): bool
    {
        $organizationUser = OrganizationUser::query()->fromRelation($organization, $user);
        return $organizationUser->count() > 0 && $organizationUser->first()->role !== "student";
    }

    public function forceDelete(User $user, Organization $organization): bool
    {
        $organizationUser = OrganizationUser::query()->fromRelation($organization, $user);

        return $organizationUser->count() > 0 && $organizationUser->first()->role !== "student";
    }

    public function addUser(User $user, Organization $organization, User $addedUser): bool {
        $organizationUser = OrganizationUser::query()->fromRelation($organization, $user);
        $organizationAddedUser = OrganizationUser::query()->fromRelation($organization, $addedUser);
        return
            $user->id !== $addedUser->id &&
            $organizationUser->count() > 0 &&
            $organizationUser->first()->role === "admin" &&
            $organizationAddedUser->count() === 0;
    }

    public function removeUser(User $user, Organization $organization, User $removedUser): bool {
        $organizationUser = OrganizationUser::query()->fromRelation($organization, $user);
        $organizationRemovedUser = OrganizationUser::query()->fromRelation($organization, $removedUser);
        return
            $user->id !== $removedUser->id &&
            $organizationUser->count() > 0 &&
            $organizationUser->first()->role === "admin" &&
            $organizationRemovedUser->count() > 0;
    }
}
