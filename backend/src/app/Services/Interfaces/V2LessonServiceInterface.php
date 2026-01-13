<?php

namespace App\Services\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

interface V2LessonServiceInterface
{
    /**
     * Get not reserved lessons list for clients.
     *
     * @param int $userId
     * @return Collection|JsonResponse
     */
    public function getClientNotReservedLessons(int $userId): Collection|JsonResponse;

    /**
     * Create new not reserved lessons for clients.
     *
     * @param array<string, mixed> $data
     * @return Collection|JsonResponse
     */
    public function createClientNotReservedLesson(array $data): Collection|JsonResponse;

    /**
     * Update a not reserved lesson for clients.
     *
     * @param int $id
     * @param array<string, mixed> $data
     * @return \App\Models\Lesson|JsonResponse
     */
    public function updateClientNotReservedLesson(int $id, array $data): \App\Models\Lesson|JsonResponse;

    /**
     * Delete a not reserved lesson for clients.
     *
     * @param int $id
     * @param int $userId
     * @return JsonResponse
     */
    public function deleteClientNotReservedLesson(int $id, int $userId): JsonResponse;

    /**
     * Get reserved lessons list for clients.
     *
     * @param int $userId
     * @return Collection|JsonResponse
     */
    public function getClientReservedLessons(int $userId): Collection|JsonResponse;

    /**
     * Confirm a reserved lesson for clients.
     *
     * @param int $id
     * @param int $userId
     * @return \App\Models\Lesson|JsonResponse
     */
    public function confirmClientReservedLesson(int $id, int $userId): \App\Models\Lesson|JsonResponse;

    /**
     * Unconfirm a reserved lesson for clients.
     *
     * @param int $id
     * @param int $userId
     * @return \App\Models\Lesson|JsonResponse
     */
    public function unconfirmClientReservedLesson(int $id, int $userId): \App\Models\Lesson|JsonResponse;

    /**
     * Cancel a reserved lesson for clients.
     *
     * @param int $id
     * @param int $userId
     * @return \App\Models\Lesson|JsonResponse
     */
    public function cancelClientReservedLesson(int $id, int $userId): \App\Models\Lesson|JsonResponse;

    /**
     * Not cancel a reserved lesson for clients.
     *
     * @param int $id
     * @param int $userId
     * @return \App\Models\Lesson|JsonResponse
     */
    public function notCancelClientReservedLesson(int $id, int $userId): \App\Models\Lesson|JsonResponse;

    /**
     * Get not reserved lessons list for coaches.
     *
     * @param int $coachId
     * @return Collection|JsonResponse
     */
    public function getCoachNotReservedLessons(int $coachId): Collection|JsonResponse;

    /**
     * Reserve a lesson for coaches (set is_reserved to true).
     *
     * @param int $id
     * @param int $coachId
     * @param array<string, mixed> $data
     * @return \App\Models\Lesson|JsonResponse
     */
    public function reserveCoachLesson(int $id, int $coachId, array $data): \App\Models\Lesson|JsonResponse;

    /**
     * Unreserve a lesson for coaches (set is_reserved to false).
     *
     * @param int $id
     * @param int $coachId
     * @return \App\Models\Lesson|JsonResponse
     */
    public function unreserveCoachLesson(int $id, int $coachId): \App\Models\Lesson|JsonResponse;

    /**
     * Get reserved lessons list for coaches.
     *
     * @param int $coachId
     * @return Collection|JsonResponse
     */
    public function getCoachReservedLessons(int $coachId): Collection|JsonResponse;

    /**
     * Cancel a reserved lesson for coaches (set is_canceled to true, is_reserved to false, is_confirmed to false).
     *
     * @param int $id
     * @param int $coachId
     * @return \App\Models\Lesson|JsonResponse
     */
    public function cancelCoachReservedLesson(int $id, int $coachId): \App\Models\Lesson|JsonResponse;

    /**
     * Get lesson condition and review information for coaches.
     *
     * @param int $id
     * @param int $coachId
     * @return \App\Models\Lesson|JsonResponse
     */
    public function getCoachLessonConditionReview(int $id, int $coachId): \App\Models\Lesson|JsonResponse;
}
