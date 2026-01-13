<?php

namespace App\Repositories\Interfaces;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Collection;

interface V2LessonRepositoryInterface
{
    /**
     * Get all lessons by user ID.
     *
     * @param int $userId
     * @return Collection<Lesson>
     */
    public function getByUserId(int $userId): Collection;

    /**
     * Get all reserved lessons by user ID.
     *
     * @param int $userId
     * @return Collection<Lesson>
     */
    public function getReservedByUserId(int $userId): Collection;

    /**
     * Get all reserved lessons by user IDs.
     *
     * @param array<int> $userIds
     * @return Collection<Lesson>
     */
    public function getReservedByUserIds(array $userIds): Collection;

    /**
     * Get all lessons by user IDs (both reserved and not reserved).
     *
     * @param array<int> $userIds
     * @return Collection<Lesson>
     */
    public function getByUserIds(array $userIds): Collection;

    /**
     * Find lesson by ID.
     *
     * @param int $id
     * @return Lesson|null
     */
    public function findById(int $id): ?Lesson;

    /**
     * Find lesson by ID and user ID.
     *
     * @param int $id
     * @param int $userId
     * @return Lesson|null
     */
    public function findByIdAndUserId(int $id, int $userId): ?Lesson;

    /**
     * Find lesson by ID and user IDs.
     *
     * @param int $id
     * @param array<int> $userIds
     * @return Lesson|null
     */
    public function findByIdAndUserIds(int $id, array $userIds): ?Lesson;

    /**
     * Create a new lesson.
     *
     * @param array<string, mixed> $data
     * @return Lesson
     */
    public function create(array $data): Lesson;

    /**
     * Update a lesson.
     *
     * @param int $id
     * @param array<string, mixed> $data
     * @return Lesson|null
     */
    public function update(int $id, array $data): ?Lesson;

    /**
     * Delete a lesson.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * Update lessons that have passed their lesson_day time to finished.
     *
     * @param int $batchSize Number of lessons to process per batch
     * @return array{total: int, updated: int, skipped: int, errors: array<string>}
     */
    public function updateFinishedLessons(int $batchSize = 100): array;
}
