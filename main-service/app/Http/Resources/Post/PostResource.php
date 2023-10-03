<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\Attachment\AttachmentResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            "title" => $this->title,
            "content" => $this->content,
            "type" => $this->type,
            "attachments" => AttachmentResource::collection(
                $this->attachments()->get()
            ),
            "deadline" => $this->whenNotNull($this->deadline),
            "createdAt" => $this->created_at
        ];
    }
}
