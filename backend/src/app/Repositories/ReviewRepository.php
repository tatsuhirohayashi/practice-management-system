<?php

namespace App\Repositories;

use App\Models\Lesson;
use App\Models\Review;
use App\Repositories\Interfaces\ReviewRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ReviewRepository implements ReviewRepositoryInterface
{
  /**
   * Get all lessons with review information for clients.
   *
   * @param int|null $userId
   * @return Collection<Lesson>
   */
  public function getLessonsWithReviews(?int $userId = null): Collection
  {
    $query = Lesson::with('user:id,first_name,last_name')
      ->with('reviews:id,lesson_id,user_id');
    
    if ($userId !== null) {
      $query->where('user_id', $userId);
    }
    
    return $query->orderBy('lesson_day', 'asc')->get();
  }

  /**
   * Find review by ID.
   *
   * @param int $id
   * @return Review|null
   */
  public function findById(int $id): ?Review
  {
    return Review::with(['lesson:id,lesson_day,lesson_location', 'user:id,first_name,last_name'])
      ->find($id);
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
        $review->load(['lesson:id,lesson_day,lesson_location', 'user:id,first_name,last_name']);

        return $review;
    }
}
