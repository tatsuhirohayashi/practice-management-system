<?php

namespace App\Repositories;

use App\Models\Review;
use App\Repositories\Interfaces\V2ReviewRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class V2ReviewRepository implements V2ReviewRepositoryInterface
{
  /**
   * Get reviews by lesson IDs.
   *
   * @param array<int> $lessonIds
   * @return Collection<Review>
   */
  public function getByLessonIds(array $lessonIds): Collection
  {
    if (empty($lessonIds)) {
      return new Collection();
    }

    return Review::whereIn('lesson_id', $lessonIds)->get();
  }

  /**
   * Find review by ID.
   *
   * @param int $id
   * @return Review|null
   */
  public function findById(int $id): ?Review
  {
    return Review::find($id);
  }

  /**
   * Find review by ID and user ID.
   *
   * @param int $id
   * @param int $userId
   * @return Review|null
   */
  public function findByIdAndUserId(int $id, int $userId): ?Review
  {
    return Review::where('id', $id)
      ->where('user_id', $userId)
      ->first();
  }

  /**
   * Create a new review.
   *
   * @param array<string, mixed> $data
   * @return Review
   */
  public function create(array $data): Review
  {
    return Review::create($data);
  }

  /**
   * Update a review.
   *
   * @param int $id
   * @param array<string, mixed> $data
   * @return Review|null
   */
  public function update(int $id, array $data): ?Review
  {
    $review = Review::find($id);
    if (!$review) {
      return null;
    }

    $review->update($data);
    $review->refresh();

    return $review;
  }
}
