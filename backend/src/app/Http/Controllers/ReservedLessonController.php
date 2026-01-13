<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetClientReservedLessonsRequest;
use App\Http\Requests\GetCoachReservedLessonsRequest;
use App\Http\Resources\LessonResource;
use App\Services\Interfaces\ReservedLessonServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservedLessonController extends Controller
{
  public function __construct(
    private readonly ReservedLessonServiceInterface $reservedLessonService
  ) {}

  /**
   * Get all reserved lessons for clients.
   */
  public function getClientReservedLessons(GetClientReservedLessonsRequest $request): JsonResponse
  {
    $result = $this->reservedLessonService->getClientReservedLessons($request);

    return LessonResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Get all reserved lessons for coaches.
   */
  public function getCoachReservedLessons(GetCoachReservedLessonsRequest $request): JsonResponse
  {
    $result = $this->reservedLessonService->getCoachReservedLessons($request);

    return LessonResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Confirm a reserved lesson (set is_confirmed to true).
   */
  public function confirmClientReservedLesson(int $id, Request $request): JsonResponse
  {
    $result = $this->reservedLessonService->confirmClientReservedLesson($id, $request);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Unconfirm a reserved lesson (set is_confirmed to false).
   */
  public function unconfirmClientReservedLesson(int $id, Request $request): JsonResponse
  {
    $result = $this->reservedLessonService->unconfirmClientReservedLesson($id, $request);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Cancel a lesson (set is_canceled to true).
   */
  public function cancelClientReservedLesson(int $id, Request $request): JsonResponse
  {
    $result = $this->reservedLessonService->cancelClientReservedLesson($id, $request);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Not cancel a lesson (set is_canceled to false).
   */
  public function notCancelClientReservedLesson(int $id, Request $request): JsonResponse
  {
    $result = $this->reservedLessonService->notCancelClientReservedLesson($id, $request);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Cancel a lesson for coaches (set is_canceled to true, is_reserved to false, is_confirmed to false).
   */
  public function cancelCoachReservedLesson(int $id, Request $request): JsonResponse
  {
    $result = $this->reservedLessonService->cancelCoachReservedLesson($id, $request);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }
}
