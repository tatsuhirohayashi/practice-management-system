<?php

namespace App\Repositories;

use App\Models\Condition;
use App\Repositories\Interfaces\V2ConditionRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class V2ConditionRepository implements V2ConditionRepositoryInterface
{
  /**
   * Get conditions by lesson IDs.
   *
   * @param array<int> $lessonIds
   * @return Collection<Condition>
   */
  public function getByLessonIds(array $lessonIds): Collection
  {
    if (empty($lessonIds)) {
      return new Collection();
    }

    return Condition::whereIn('lesson_id', $lessonIds)->get();
  }

  /**
   * Find condition by ID.
   *
   * @param int $id
   * @return Condition|null
   */
  public function findById(int $id): ?Condition
  {
    return Condition::find($id);
  }

  /**
   * Find condition by ID and user ID.
   *
   * @param int $id
   * @param int $userId
   * @return Condition|null
   */
  public function findByIdAndUserId(int $id, int $userId): ?Condition
  {
    return Condition::where('id', $id)
      ->where('user_id', $userId)
      ->first();
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

    return $condition;
  }
}
