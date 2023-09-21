<?php

namespace App\Http\Resources\Class;

use App\Models\SchoolClassUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->whenNotNull($this->description),
            "teachers" => SchoolClassUser::query()
                ->where("school_class_id", $this->id)
                ->where("role", "=", "teacher")
                ->get()->map(fn (SchoolClassUser $class) =>
                    User::find($class->user_id)
                ),
            "students" => SchoolClassUser::query()
                ->where("school_class_id", $this->id)
                ->where("role", "=", "student")
                ->get()->map(fn (SchoolClassUser $class) =>
                    User::find($class->user_id)
                ),
        ];
    }
}
