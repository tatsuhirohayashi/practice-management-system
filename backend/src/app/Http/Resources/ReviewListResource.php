<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // 現在のレッスンに対するレビューを取得（最初の1つを取得）
        $review = $this->reviews->first();

        return [
            'id' => $this->id,
            'lesson_day' => $this->lesson_day->format('Y-m-d H:i:s'),
            'lesson_location' => $this->lesson_location,
            'lesson_memo' => $this->lesson_memo,
            'is_finished' => $this->is_finished,
            'user' => [
                'id' => $this->user->id,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
            ],
            'has_review' => $review !== null,
            'review_id' => $review?->id,
        ];
    }
}
