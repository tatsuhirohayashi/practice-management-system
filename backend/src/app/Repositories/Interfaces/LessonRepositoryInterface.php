<?php

namespace App\Repositories\Interfaces;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Collection;

interface LessonRepositoryInterface
{
    /**
     * Get all reserved lessons.
     *
     * @param int|null $userId
     * @param array<int>|null $userIds
     * @return Collection<Lesson>
     */
    public function getReservedLessons(?int $userId = null, ?array $userIds = null): Collection;

    /**
     * Get all not reserved lessons.
     *
     * @param int|null $userId
     * @param array<int>|null $userIds
     * @return Collection<Lesson>
     */
    public function getNotReservedLessons(?int $userId = null, ?array $userIds = null): Collection;

    /**
     * Get all lessons (both reserved and not reserved).
     *
     * @param int|null $userId
     * @param array<int>|null $userIds
     * @return Collection<Lesson>
     */
    public function getAllLessons(?int $userId = null, ?array $userIds = null): Collection;

    /**
     * Create a new lesson.
     *
     * @param array<string, mixed> $data
     * @return Lesson
     */
    public function create(array $data): Lesson;

    /**
     * Find a lesson by ID.
     *
     * @param int $id
     * @return Lesson|null
     */
    public function findById(int $id): ?Lesson;

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
     * Find lesson by ID with conditions and reviews.
     *
     * @param int $id
     * @return \App\Models\Lesson|null
     */
    public function findByIdWithConditionAndReview(int $id): ?\App\Models\Lesson;
}

