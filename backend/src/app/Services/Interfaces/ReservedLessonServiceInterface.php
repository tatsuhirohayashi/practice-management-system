<?php

namespace App\Services\Interfaces;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

interface ReservedLessonServiceInterface
{
    /**
     * Get all reserved lessons for clients.
     *
     * @param Request $request
     * @return Collection|JsonResponse
     */
    public function getClientReservedLessons(Request $request): Collection|JsonResponse;

    /**
     * Get all reserved lessons for coaches.
     *
     * @param Request $request
     * @return Collection|JsonResponse
     */
    public function getCoachReservedLessons(Request $request): Collection|JsonResponse;

    /**
     * Confirm a reserved lesson (set is_confirmed to true).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function confirmClientReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse;

    /**
     * Unconfirm a reserved lesson (set is_confirmed to false).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function unconfirmClientReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse;

    /**
     * Cancel a lesson (set is_canceled to true).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function cancelClientReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse;

    /**
     * Not cancel a lesson (set is_canceled to false).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function notCancelClientReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse;

    /**
     * Cancel a lesson for coaches (set is_canceled to true, is_reserved to false, is_confirmed to false).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function cancelCoachReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse;
}
