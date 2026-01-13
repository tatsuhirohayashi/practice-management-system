<?php

namespace App\Repositories\Interfaces;

use App\Models\Condition;
use Illuminate\Database\Eloquent\Collection;

interface V2ConditionRepositoryInterface
{
    /**
     * Get conditions by lesson IDs.
     *
     * @param array<int> $lessonIds
     * @return Collection<Condition>
     */
    public function getByLessonIds(array $lessonIds): Collection;

    /**
     * Find condition by ID.
     *
     * @param int $id
     * @return Condition|null
     */
    public function findById(int $id): ?Condition;

    /**
     * Find condition by ID and user ID.
     *
     * @param int $id
     * @param int $userId
     * @return Condition|null
     */
    public function findByIdAndUserId(int $id, int $userId): ?Condition;

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
