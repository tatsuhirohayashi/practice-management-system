<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonConditionReviewResource extends JsonResource
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
      'lesson_day' => $this->lesson_day->format('Y-m-d H:i:s'),
      'lesson_location' => $this->lesson_location,
      'lesson_memo' => $this->lesson_memo,
      'is_reserved' => $this->is_reserved,
      'is_confirmed' => $this->is_confirmed,
      'is_canceled' => $this->is_canceled,
      'is_finished' => $this->is_finished,
      'user' => [
        'id' => $this->user->id,
        'first_name' => $this->user->first_name,
        'last_name' => $this->user->last_name,
      ],
      'conditions' => $this->conditions->map(function ($condition) {
        return [
          'id' => $condition->id,
          'user_id' => $condition->user_id,
          'musle_pain' => $condition->musle_pain,
          'motivation' => $condition->motivation,
          'feeling' => $condition->feeling,
          'tired' => $condition->tired,
          'condition_memo' => $condition->condition_memo,
        ];
      }),
      'reviews' => $this->reviews->map(function ($review) {
        return [
          'id' => $review->id,
          'user_id' => $review->user_id,
          'forehand' => $review->forehand,
          'backhand' => $review->backhand,
          'serve' => $review->serve,
          'volley' => $review->volley,
          'return' => $review->return,
          'serve_in' => $review->serve_in,
          'return_in' => $review->return_in,
          'review_memo' => $review->review_memo,
        ];
      }),
    ];
  }
}
