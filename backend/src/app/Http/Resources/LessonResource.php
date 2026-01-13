<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'lesson_day' => $this->lesson_day->format('Y-m-d H:i:s'),
            'lesson_location' => $this->lesson_location,
            'lesson_memo' => $this->lesson_memo,
            'is_reserved' => $this->is_reserved,
            'is_confirmed' => $this->is_confirmed,
            'is_canceled' => $this->is_canceled,
            'is_finished' => $this->is_finished,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            'user' => [
                'id' => $this->user->id,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
            ],
        ];
    }
}

