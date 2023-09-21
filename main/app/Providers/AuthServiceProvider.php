<?php

namespace App\Providers;

use App\Models\Organization;
use App\Models\OrganizationUser;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

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

        Gate::define(
            "view-all-classes",
            function (User $user, Organization $organization) {
                return OrganizationUser::fromRelation($organization, $user)->count() !== 0;
            }
        );

        Gate::define(
            "store-class",
            function (User $user, Organization $organization) {
                $organizationUser = OrganizationUser::fromRelation($organization, $user)->count();
                return
                    $organizationUser->count() !== 0 &&
                    $organizationUser->first()->role === "admin";
            }
        );
    }
}
