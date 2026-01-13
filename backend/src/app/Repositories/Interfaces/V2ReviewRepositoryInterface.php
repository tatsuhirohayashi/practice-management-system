<?php

namespace App\Repositories\Interfaces;

use App\Models\Review;
use Illuminate\Database\Eloquent\Collection;

interface V2ReviewRepositoryInterface
{
  /**
   * Get reviews by lesson IDs.
   *
   * @param array<int> $lessonIds
   * @return Collection<Review>
   */
  public function getByLessonIds(array $lessonIds): Collection;

  /**
   * Find review by ID.
   *
   * @param int $id
   * @return Review|null
   */
  public function findById(int $id): ?Review;

  /**
   * Find review by ID and user ID.
   *
   * @param int $id
   * @param int $userId
   * @return Review|null
   */
  public function findByIdAndUserId(int $id, int $userId): ?Review;

  /**
   * Create a new review.
   *
   * @param array<string, mixed> $data
   * @return Review
   */
  public function create(array $data): Review;

  /**
   * Update a review.
   *
   * @param int $id
   * @param array<string, mixed> $data
   * @return Review|null
   */
  public function update(int $id, array $data): ?Review;
}
