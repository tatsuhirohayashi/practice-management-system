<?php

namespace App\Repositories\Interfaces;

use App\Models\Condition;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Collection;

interface ConditionRepositoryInterface
{
    /**
     * Get all lessons with condition information for clients.
     *
     * @param int|null $userId
     * @return Collection<Lesson>
     */
    public function getLessonsWithConditions(?int $userId = null): Collection;

    /**
     * Find condition by lesson ID and user ID.
     *
     * @param int $lessonId
     * @param int $userId
     * @return Condition|null
     */
    public function findByLessonIdAndUserId(int $lessonId, int $userId): ?Condition;

    /**
     * Find condition by ID.
     *
     * @param int $id
     * @return Condition|null
     */
    public function findById(int $id): ?Condition;

    /**
     * Create a new condition.
     *
     * @param array<string, mixed> $data
     * @return Condition
     */
    public function create(array $data): Condition;

    /**
     * Update a condition.
     *
     * @param int $id
     * @param array<string, mixed> $data
     * @return Condition|null
     */
    public function update(int $id, array $data): ?Condition;
}
