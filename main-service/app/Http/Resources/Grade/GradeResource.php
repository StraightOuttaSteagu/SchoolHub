<?php

namespace App\Http\Resources\Grade;

use App\Http\Resources\Grade\GradeUserResource;
use App\Http\Resources\SchoolClass\PublicClassResource;
use App\Models\SchoolClass;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GradeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "user" => new GradeUserResource(User::find($this->user_id)->get()),
            "class" => new PublicClassResource(SchoolClass::find($this->school_class_id)->get()),
            "createdAt" => $this->created_at
        ];
    }
}
