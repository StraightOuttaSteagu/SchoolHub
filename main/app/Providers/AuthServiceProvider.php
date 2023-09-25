<?php

namespace App\Providers;

use App\Models\Organization;
use App\Models\OrganizationUser;
use App\Models\SchoolClass;
use App\Models\SchoolClassUser;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use function Laravel\Prompts\error;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        // todo use policies pls
        Gate::define(
            "view-all-classes",
            function (User $user, Organization $organization) {
                return OrganizationUser::fromRelation($organization, $user)->count() !== 0;
            }
        );

        Gate::define(
            "show-class",
            function (User $user, Organization $organization) {
                return OrganizationUser::fromRelation($organization, $user);
            }
        );

        Gate::define(
            "store-class",
            function (User $user, Organization $organization) {
                $organizationUser = OrganizationUser::fromRelation($organization, $user);
                return
                    $organizationUser->count() !== 0 &&
                    $organizationUser->first()->role === "admin";
            }
        );

        Gate::define(
            "update-class",
            function (User $user, Organization $organization) {
                $organizationUser = OrganizationUser::fromRelation($organization, $user)->count();
                return
                    $organizationUser->count() !== 0 &&
                    $organizationUser->first()->role === "admin";
            }
        );

        Gate::define(
            "delete-class",
            function (User $user, Organization $organization) {
                $organizationUser = OrganizationUser::fromRelation($organization, $user);
                return
                    $organizationUser->count() !== 0 &&
                    $organizationUser->first()->role === "admin";
            }
        );

        Gate::define(
            "class-user",
            function (
                User $user,
                Organization $organization,
                SchoolClass $schoolClass,
                User $classUser
            ) {
                $organizationUser = OrganizationUser::fromRelation($organization, $user);
                return
                    $organizationUser->count() !== 0 &&
                    $organizationUser->first()->role === "admin" &&
                    SchoolClassUser::query()
                        ->where("user_id", "=", $classUser->id)
                        ->where("school_class_id", "=", $schoolClass->id)
                        ->count() === 0;
            }
        );
    }
}
