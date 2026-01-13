<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancelClientReservedLessonRequest;
use App\Http\Requests\CancelCoachReservedLessonRequest;
use App\Http\Requests\ConfirmClientReservedLessonRequest;
use App\Http\Requests\CreateLessonRequest;
use App\Http\Requests\DeleteClientNotReservedLessonRequest;
use App\Http\Requests\GetClientNotReservedLessonsRequest;
use App\Http\Requests\GetClientReservedLessonsRequest;
use App\Http\Requests\GetCoachLessonConditionReviewRequest;
use App\Http\Requests\GetCoachNotReservedLessonsRequest;
use App\Http\Requests\GetCoachReservedLessonsRequest;
use App\Http\Requests\NotCancelClientReservedLessonRequest;
use App\Http\Requests\ReserveCoachLessonRequest;
use App\Http\Requests\UnconfirmClientReservedLessonRequest;
use App\Http\Requests\UnreserveCoachLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Http\Resources\LessonConditionReviewResource;
use App\Http\Resources\LessonResource;
use App\Services\Interfaces\V2LessonServiceInterface;
use Illuminate\Http\JsonResponse;

class V2LessonController extends Controller
{
  public function __construct(
    private readonly V2LessonServiceInterface $lessonService
  ) {}

  /**
   * Get not reserved lessons list for clients.
   */
  public function getClientNotReservedLessons(GetClientNotReservedLessonsRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->lessonService->getClientNotReservedLessons($userId);

    return LessonResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Create new not reserved lessons for clients.
   */
  public function createClientNotReservedLesson(CreateLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();

    $result = $this->lessonService->createClientNotReservedLesson($validated);

    if ($result instanceof JsonResponse) {
      return $result;
    }

    return LessonResource::collection($result)->response()->setStatusCode(201);
  }

  /**
   * Update a not reserved lesson for clients.
   */
  public function updateClientNotReservedLesson(int $id, UpdateLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();

    $result = $this->lessonService->updateClientNotReservedLesson($id, $validated);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Delete a not reserved lesson for clients.
   */
  public function deleteClientNotReservedLesson(int $id, DeleteClientNotReservedLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    return $this->lessonService->deleteClientNotReservedLesson($id, $userId);
  }

  /**
   * Get reserved lessons list for clients.
   */
  public function getClientReservedLessons(GetClientReservedLessonsRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->lessonService->getClientReservedLessons($userId);

    return LessonResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Confirm a reserved lesson for clients.
   */
  public function confirmClientReservedLesson(int $id, ConfirmClientReservedLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->lessonService->confirmClientReservedLesson($id, $userId);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Unconfirm a reserved lesson for clients.
   */
  public function unconfirmClientReservedLesson(int $id, UnconfirmClientReservedLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->lessonService->unconfirmClientReservedLesson($id, $userId);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Cancel a reserved lesson for clients.
   */
  public function cancelClientReservedLesson(int $id, CancelClientReservedLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->lessonService->cancelClientReservedLesson($id, $userId);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Not cancel a reserved lesson for clients.
   */
  public function notCancelClientReservedLesson(int $id, NotCancelClientReservedLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->lessonService->notCancelClientReservedLesson($id, $userId);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Get not reserved lessons list for coaches.
   */
  public function getCoachNotReservedLessons(GetCoachNotReservedLessonsRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $coachId = (int)$validated['user_id'];

    $result = $this->lessonService->getCoachNotReservedLessons($coachId);

    return LessonResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Reserve a lesson for coaches (set is_reserved to true).
   */
  public function reserveCoachLesson(int $id, ReserveCoachLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $coachId = (int)$validated['user_id'];
    $lessonData = ['lesson_location' => $validated['lesson_location']];

    $result = $this->lessonService->reserveCoachLesson($id, $coachId, $lessonData);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Unreserve a lesson for coaches (set is_reserved to false).
   */
  public function unreserveCoachLesson(int $id, UnreserveCoachLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $coachId = (int)$validated['user_id'];

    $result = $this->lessonService->unreserveCoachLesson($id, $coachId);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Get reserved lessons list for coaches.
   */
  public function getCoachReservedLessons(GetCoachReservedLessonsRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $coachId = (int)$validated['user_id'];

    $result = $this->lessonService->getCoachReservedLessons($coachId);

    return LessonResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Cancel a reserved lesson for coaches.
   */
  public function cancelCoachReservedLesson(int $id, CancelCoachReservedLessonRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $coachId = (int)$validated['user_id'];

    $result = $this->lessonService->cancelCoachReservedLesson($id, $coachId);

    return LessonResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Get lesson condition and review information for coaches.
   */
  public function getCoachLessonConditionReview(int $id, GetCoachLessonConditionReviewRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $coachId = (int)$validated['user_id'];

    $result = $this->lessonService->getCoachLessonConditionReview($id, $coachId);

    if ($result instanceof JsonResponse) {
      return $result;
    }

    return LessonConditionReviewResource::make($result)->response()->setStatusCode(200);
  }
}
