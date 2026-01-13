<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConditionDetailResource extends JsonResource
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
      'musle_pain' => $this->musle_pain,
      'motivation' => $this->motivation,
      'feeling' => $this->feeling,
      'tired' => $this->tired,
      'condition_memo' => $this->condition_memo,
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
    ];
  }
}
