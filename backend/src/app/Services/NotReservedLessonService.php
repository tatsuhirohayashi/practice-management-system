<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Repositories\Interfaces\LessonRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Interfaces\NotReservedLessonServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotReservedLessonService implements NotReservedLessonServiceInterface
{
  public function __construct(
    private readonly LessonRepositoryInterface $lessonRepository,
    private readonly UserRepositoryInterface $userRepository
  ) {}

  /**
   * Get all not reserved lessons for clients.
   *
   * @param Request $request
   * @return Collection|JsonResponse
   */
  public function getClientNotReservedLessons(Request $request): Collection|JsonResponse
  {
    try {
      $validated = $request->validated();
      $userId = (int)$validated['user_id'];
      $lessons = $this->lessonRepository->getAllLessons($userId);

      // レッスンが0件の場合も空のコレクションを返す
      return $lessons;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while fetching lessons.'
      );
    }
  }

  /**
   * Get all lessons for coaches (both reserved and not reserved).
   *
   * @param Request $request
   * @return Collection|JsonResponse
   */
  public function getCoachNotReservedLessons(Request $request): Collection|JsonResponse
  {
    try {
      $validated = $request->validated();
      $coachId = (int)$validated['user_id'];

      // コーチに紐づくクライアントを取得
      $clients = $this->userRepository->getClientsByCoachId($coachId);
      $clientIds = $clients->pluck('id')->toArray();

      // クライアントが0件の場合は空のコレクションを返す
      if (empty($clientIds)) {
        return new \Illuminate\Database\Eloquent\Collection([]);
      }

      // クライアントのレッスンを取得
      $lessons = $this->lessonRepository->getAllLessons(null, $clientIds);

      // レッスンが0件の場合も空のコレクションを返す
      return $lessons;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while fetching lessons.'
      );
    }
  }

  /**
   * Create a new not reserved lesson for clients.
   *
   * @param Request $request
   * @return \App\Models\Lesson|JsonResponse
   */
  public function createClientNotReservedLesson(Request $request): \App\Models\Lesson|JsonResponse
  {
    try {
      $validated = $request->validated();

      $lessonData = array_merge($validated, [
        'user_id' => $request->user_id ?? 1, // TODO: 認証実装後に認証済みユーザーのIDを使用
        'is_reserved' => false,
        'is_confirmed' => false,
        'is_canceled' => false,
        'is_finished' => false,
      ]);

      $lesson = $this->lessonRepository->create($lessonData);

      return $lesson;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while creating not reserved lesson.'
      );
    }
  }

  /**
   * Update a not reserved lesson for clients.
   *
   * @param int $id
   * @param Request $request
   * @return \App\Models\Lesson|JsonResponse
   */
  public function updateClientNotReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse
  {
    try {
      // レッスンが存在し、かつ予約されていないことを確認
      $lesson = $this->lessonRepository->findById($id);
      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      if ($lesson->is_reserved) {
        return ResponseHelper::error('Cannot update a reserved lesson.', 400);
      }

      $validated = $request->validated();
      $updatedLesson = $this->lessonRepository->update($id, $validated);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while updating not reserved lesson.'
      );
    }
  }

  /**
   * Delete a not reserved lesson for clients.
   *
   * @param int $id
   * @param Request $request
   * @return JsonResponse
   */
  public function deleteClientNotReservedLesson(int $id, Request $request): JsonResponse
  {
    try {
      // レッスンが存在し、かつ予約されていないことを確認
      $lesson = $this->lessonRepository->findById($id);
      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      if ($lesson->is_reserved) {
        return ResponseHelper::error('Cannot delete a reserved lesson.', 400);
      }

      $deleted = $this->lessonRepository->delete($id);
      if (!$deleted) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      return ResponseHelper::success(null, 'Lesson deleted successfully.', 200);
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while deleting not reserved lesson.'
      );
    }
  }

  /**
   * Reserve a lesson for coaches (set is_reserved to true).
   *
   * @param int $id
   * @param Request $request
   * @return \App\Models\Lesson|JsonResponse
   */
  public function reserveCoachLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse
  {
    try {
      // レッスンが存在することを確認
      $lesson = $this->lessonRepository->findById($id);
      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      if ($lesson->is_reserved) {
        return ResponseHelper::error('Lesson is already reserved.', 400);
      }

      $validated = $request->validated();
      $updateData = array_merge(['is_reserved' => true], $validated);
      $updatedLesson = $this->lessonRepository->update($id, $updateData);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while reserving lesson.'
      );
    }
  }

  /**
   * Unreserve a lesson for coaches (set is_reserved to false).
   *
   * @param int $id
   * @param Request $request
   * @return \App\Models\Lesson|JsonResponse
   */
  public function unreserveCoachLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse
  {
    try {
      // レッスンが存在することを確認
      $lesson = $this->lessonRepository->findById($id);
      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      if (!$lesson->is_reserved) {
        return ResponseHelper::error('Lesson is already not reserved.', 400);
      }

      $updatedLesson = $this->lessonRepository->update($id, ['is_reserved' => false]);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while unreserving lesson.'
      );
    }
  }
}
