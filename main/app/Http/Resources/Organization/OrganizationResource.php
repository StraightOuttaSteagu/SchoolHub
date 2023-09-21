<?php

namespace App\Http\Resources\Organization;

use App\Http\Resources\Class\PublicClassResource;
use App\Models\OrganizationUser;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "users" => OrganizationUserResource::collection(
                OrganizationUser
                    ::query()
                    ->where("organization_id", "=", $this->id)
                    ->get()
            ),
            "classes" => PublicClassResource::collection(
                $this->classes()->get()
            )
        ];
    }
}
