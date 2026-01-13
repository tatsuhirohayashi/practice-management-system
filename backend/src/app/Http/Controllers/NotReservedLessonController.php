<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLessonRequest;
use App\Http\Requests\GetClientNotReservedLessonsRequest;
use App\Http\Requests\GetCoachNotReservedLessonsRequest;
use App\Http\Requests\ReserveLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Http\Resources\LessonResource;
use App\Services\Interfaces\NotReservedLessonServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotReservedLessonController extends Controller
{
  public function __construct(
    private readonly NotReservedLessonServiceInterface $notReservedLessonService
  ) {}

  /**
   * Get all not reserved lessons for clients.
   */
  public function getClientNotReservedLessons(GetClientNotReservedLessonsRequest $request): JsonResponse
  {
    $result = $this->notReservedLessonService->getClientNotReservedLessons($request);

    return LessonResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Get all lessons for coaches (both reserved and not reserved).
   */
  public function getCoachNotReservedLessons(GetCoachNotReservedLessonsRequest $request): JsonResponse
  {
    $result = $this->notReservedLessonService->getCoachNotReservedLessons($request);

    return LessonResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Create a new not reserved lesson for clients.
   */
  public function createClientNotReservedLesson(CreateLessonRequest $request): JsonResponse
  {
    $result = $this->notReservedLessonService->createClientNotReservedLesson($request);

    return LessonResource::make($result)->response()->setStatusCode(201);
  }

  /**
   * Update a not reserved lesson for clients.
   */
  public function updateClientNotReservedLesson(int $id, UpdateLessonRequest $request): JsonResponse
  {
    $result = $this->notReservedLessonService->updateClientNotReservedLesson($id, $request);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Delete a not reserved lesson for clients.
   */
  public function deleteClientNotReservedLesson(int $id, Request $request): JsonResponse
  {
    return $this->notReservedLessonService->deleteClientNotReservedLesson($id, $request);
  }

  /**
   * Reserve a lesson for coaches (set is_reserved to true).
   */
  public function reserveCoachLesson(int $id, ReserveLessonRequest $request): JsonResponse
  {
    $result = $this->notReservedLessonService->reserveCoachLesson($id, $request);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Unreserve a lesson for coaches (set is_reserved to false).
   */
  public function unreserveCoachLesson(int $id, Request $request): JsonResponse
  {
    $result = $this->notReservedLessonService->unreserveCoachLesson($id, $request);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }
}
