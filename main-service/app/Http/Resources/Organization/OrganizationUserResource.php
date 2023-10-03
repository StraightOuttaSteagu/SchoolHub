<?php

namespace App\Http\Resources\Organization;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = new UserResource(User::find($this->user_id));
        return [
            ...$user->toArray($request),
            "role" => $this->role
        ];
    }
}
