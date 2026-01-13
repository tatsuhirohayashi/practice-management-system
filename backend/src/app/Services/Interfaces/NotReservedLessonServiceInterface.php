<?php

namespace App\Services\Interfaces;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

interface NotReservedLessonServiceInterface
{
    /**
     * Get all not reserved lessons for clients.
     *
     * @param Request $request
     * @return Collection|JsonResponse
     */
    public function getClientNotReservedLessons(Request $request): Collection|JsonResponse;

    /**
     * Get all lessons for coaches (both reserved and not reserved).
     *
     * @param Request $request
     * @return Collection|JsonResponse
     */
    public function getCoachNotReservedLessons(Request $request): Collection|JsonResponse;

    /**
     * Create a new not reserved lesson for clients.
     *
     * @param Request $request
     * @return Lesson|JsonResponse
     */
    public function createClientNotReservedLesson(Request $request): \App\Models\Lesson|JsonResponse;

    /**
     * Update a not reserved lesson for clients.
     *
     * @param int $id
     * @param Request $request
     * @return Lesson|JsonResponse
     */
    public function updateClientNotReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse;

    /**
     * Delete a not reserved lesson for clients.
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteClientNotReservedLesson(int $id, Request $request): JsonResponse;

    /**
     * Reserve a lesson for coaches (set is_reserved to true).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function reserveCoachLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse;

    /**
     * Unreserve a lesson for coaches (set is_reserved to false).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function unreserveCoachLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse;
}
