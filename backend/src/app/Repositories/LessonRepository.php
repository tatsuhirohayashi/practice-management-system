<?php

namespace App\Repositories;

use App\Models\Lesson;
use App\Repositories\Interfaces\LessonRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class LessonRepository implements LessonRepositoryInterface
{
    /**
     * Get all reserved lessons.
     *
     * @param int|null $userId
     * @param array<int>|null $userIds
     * @return Collection<Lesson>
     */
    public function getReservedLessons(?int $userId = null, ?array $userIds = null): Collection
    {
        $query = Lesson::where('is_reserved', true)
            ->with('user:id,first_name,last_name');

        if ($userId !== null) {
            $query->where('user_id', $userId);
        } elseif ($userIds !== null && !empty($userIds)) {
            $query->whereIn('user_id', $userIds);
        }

        return $query->orderBy('lesson_day', 'asc')->get();
    }

    /**
     * Get all not reserved lessons.
     *
     * @param int|null $userId
     * @param array<int>|null $userIds
     * @return Collection<Lesson>
     */
    public function getNotReservedLessons(?int $userId = null, ?array $userIds = null): Collection
    {
        $query = Lesson::where('is_reserved', false)
            ->with('user:id,first_name,last_name');

        if ($userId !== null) {
            $query->where('user_id', $userId);
        } elseif ($userIds !== null && !empty($userIds)) {
            $query->whereIn('user_id', $userIds);
        }

        return $query->orderBy('lesson_day', 'asc')->get();
    }

    /**
     * Get all lessons (both reserved and not reserved).
     *
     * @param int|null $userId
     * @param array<int>|null $userIds
     * @return Collection<Lesson>
     */
    public function getAllLessons(?int $userId = null, ?array $userIds = null): Collection
    {
        $query = Lesson::with('user:id,first_name,last_name');

        if ($userId !== null) {
            $query->where('user_id', $userId);
        } elseif ($userIds !== null && !empty($userIds)) {
            $query->whereIn('user_id', $userIds);
        }

        return $query->orderBy('lesson_day', 'asc')->get();
    }

    /**
     * Create a new lesson.
     *
     * @param array<string, mixed> $data
     * @return Lesson
     */
    public function create(array $data): Lesson
    {
        return Lesson::create($data);
    }

    /**
     * Find a lesson by ID.
     *
     * @param int $id
     * @return Lesson|null
     */
    public function findById(int $id): ?Lesson
    {
        return Lesson::find($id);
    }

    /**
     * Update a lesson.
     *
     * @param int $id
     * @param array<string, mixed> $data
     * @return Lesson|null
     */
    public function update(int $id, array $data): ?Lesson
    {
        $lesson = Lesson::find($id);
        if (!$lesson) {
            return null;
        }

        $lesson->update($data);
        $lesson->refresh();
        $lesson->load('user:id,first_name,last_name');

        return $lesson;
    }

    /**
     * Delete a lesson.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $lesson = Lesson::find($id);
        if (!$lesson) {
            return false;
        }

        return $lesson->delete();
    }

    /**
     * Find lesson by ID with conditions and reviews.
     *
     * @param int $id
     * @return Lesson|null
     */
    public function findByIdWithConditionAndReview(int $id): ?Lesson
    {
        return Lesson::with([
            'user:id,first_name,last_name',
            'conditions:id,lesson_id,user_id,musle_pain,motivation,feeling,tired,condition_memo',
            'reviews:id,lesson_id,user_id,forehand,backhand,serve,volley,return,serve_in,return_in,review_memo'
        ])->find($id);
    }
}
