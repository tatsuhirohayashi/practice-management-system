<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConditionListResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    // 現在のレッスンに対するコンディションを取得（最初の1つを取得）
    $condition = $this->conditions->first();

    return [
      'id' => $this->id,
      'lesson_day' => $this->lesson_day->format('Y-m-d H:i:s'),
      'lesson_location' => $this->lesson_location,
      'lesson_memo' => $this->lesson_memo,
      'user' => [
        'id' => $this->user->id,
        'first_name' => $this->user->first_name,
        'last_name' => $this->user->last_name,
      ],
      'has_condition' => $condition !== null,
      'condition_id' => $condition?->id,
    ];
  }
}
