<?php

namespace App\Repositories;

use App\Models\Condition;
use App\Models\Lesson;
use App\Repositories\Interfaces\ConditionRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ConditionRepository implements ConditionRepositoryInterface
{
  /**
   * Get all lessons with condition information for clients.
   *
   * @param int|null $userId
   * @return Collection<Lesson>
   */
  public function getLessonsWithConditions(?int $userId = null): Collection
  {
    $query = Lesson::with('user:id,first_name,last_name')
      ->with('conditions:id,lesson_id,user_id');

    if ($userId !== null) {
      $query->where('user_id', $userId);
    }

    return $query->orderBy('lesson_day', 'asc')->get();
  }

  /**
   * Find condition by lesson ID and user ID.
   *
   * @param int $lessonId
   * @param int $userId
   * @return Condition|null
   */
  public function findByLessonIdAndUserId(int $lessonId, int $userId): ?Condition
  {
    return Condition::where('lesson_id', $lessonId)
      ->where('user_id', $userId)
      ->first();
  }

  /**
   * Find condition by ID.
   *
   * @param int $id
   * @return Condition|null
   */
  public function findById(int $id): ?Condition
  {
    return Condition::with(['lesson:id,lesson_day,lesson_location', 'user:id,first_name,last_name'])
      ->find($id);
  }

  /**
   * Create a new condition.
   *
   * @param array<string, mixed> $data
   * @return Condition
   */
  public function create(array $data): Condition
  {
    return Condition::create($data);
  }

  /**
   * Update a condition.
   *
   * @param int $id
   * @param array<string, mixed> $data
   * @return Condition|null
   */
  public function update(int $id, array $data): ?Condition
  {
    $condition = Condition::find($id);
    if (!$condition) {
      return null;
    }

    $condition->update($data);
    $condition->refresh();
    $condition->load(['lesson:id,lesson_day,lesson_location', 'user:id,first_name,last_name']);

    return $condition;
  }
}
