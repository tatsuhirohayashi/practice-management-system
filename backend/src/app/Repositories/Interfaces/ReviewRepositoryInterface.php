<?php

namespace App\Repositories\Interfaces;

use App\Models\Review;
use Illuminate\Database\Eloquent\Collection;

interface ReviewRepositoryInterface
{
    /**
     * Get all lessons with review information for clients.
     *
     * @param int|null $userId
     * @return Collection<\App\Models\Lesson>
     */
    public function getLessonsWithReviews(?int $userId = null): Collection;

    /**
     * Find review by ID.
     *
     * @param int $id
     * @return Review|null
     */
    public function findById(int $id): ?Review;

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

