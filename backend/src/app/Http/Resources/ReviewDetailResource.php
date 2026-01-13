<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewDetailResource extends JsonResource
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
            'forehand' => $this->forehand,
            'backhand' => $this->backhand,
            'serve' => $this->serve,
            'volley' => $this->volley,
            'return' => $this->return,
            'serve_in' => $this->serve_in,
            'return_in' => $this->return_in,
            'review_memo' => $this->review_memo,
            'lesson' => [
                'id' => $this->lesson->id,
                'lesson_day' => $this->lesson->lesson_day->format('Y-m-d H:i:s'),
                'lesson_location' => $this->lesson->lesson_location,
            ],
            'user' => [
                'id' => $this->user->id,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
            ],
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}

