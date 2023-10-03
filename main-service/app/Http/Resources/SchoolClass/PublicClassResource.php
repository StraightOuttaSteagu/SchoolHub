<?php

namespace App\Http\Resources\SchoolClass;

use App\Http\Resources\UserResource;
use App\Models\SchoolClassUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicClassResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "identifier" => $this->identifier,
            "subject" => $this->subject,
            "theme" => $this->theme,
            "icon" => $this->icon,
            "description" => $this->whenNotNull($this->description),
            "creator" => new UserResource($this->creator()->first())
        ];
    }
}
