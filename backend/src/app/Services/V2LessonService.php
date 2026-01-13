<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Repositories\Interfaces\V2ConditionRepositoryInterface;
use App\Repositories\Interfaces\V2LessonRepositoryInterface;
use App\Repositories\Interfaces\V2ReviewRepositoryInterface;
use App\Repositories\Interfaces\V2UserRepositoryInterface;
use App\Services\Interfaces\V2LessonServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class V2LessonService implements V2LessonServiceInterface
{
  public function __construct(
    private readonly V2LessonRepositoryInterface $lessonRepository,
    private readonly V2UserRepositoryInterface $userRepository,
    private readonly V2ConditionRepositoryInterface $conditionRepository,
    private readonly V2ReviewRepositoryInterface $reviewRepository
  ) {}

  /**
   * Get not reserved lessons list for clients.
   *
   * @param int $userId
   * @return Collection|JsonResponse
   */
  public function getClientNotReservedLessons(int $userId): Collection|JsonResponse
  {
    try {
      // 各ドメインのRepositoryからデータを取得
      $lessons = $this->lessonRepository->getByUserId($userId);
      $user = $this->userRepository->getById($userId);

      // 各Lessonにuserを設定
      foreach ($lessons as $lesson) {
        $lesson->setRelation('user', $user);
      }

      // レッスンが0件の場合も空のコレクションを返す
      return $lessons;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while fetching lessons.',
        500,
        $e
      );
    }
  }

  /**
   * Create new not reserved lessons for clients.
   *
   * @param array<string, mixed> $data
   * @return Collection|JsonResponse
   */
  public function createClientNotReservedLesson(array $data): Collection|JsonResponse
  {
    try {
      $userId = (int)$data['user_id'];
      $lessonsData = $data['lessons'];
      $user = $this->userRepository->getById($userId);

      if (!$user) {
        return ResponseHelper::error('User not found.', 404);
      }

      // トランザクション処理で複数のレッスンを作成
      $createdLessons = DB::transaction(function () use ($userId, $lessonsData, $user) {
        $lessons = new Collection();

        foreach ($lessonsData as $lessonItem) {
          // デフォルト値を設定
          $lessonData = array_merge($lessonItem, [
            'user_id' => $userId,
            'is_reserved' => false,
            'is_confirmed' => false,
            'is_canceled' => false,
            'is_finished' => false,
          ]);

          // 各ドメインのRepositoryからデータを取得
          $lesson = $this->lessonRepository->create($lessonData);

          // Lessonにuserを設定
          $lesson->setRelation('user', $user);

          $lessons->push($lesson);
        }

        return $lessons;
      });

      return $createdLessons;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while creating not reserved lessons.',
        500,
        $e
      );
    }
  }

  /**
   * Update a not reserved lesson for clients.
   *
   * @param int $id
   * @param array<string, mixed> $data
   * @return \App\Models\Lesson|JsonResponse
   */
  public function updateClientNotReservedLesson(int $id, array $data): \App\Models\Lesson|JsonResponse
  {
    try {
      // user_idで絞り込んでLessonを取得
      $userId = (int)$data['user_id'];
      $lesson = $this->lessonRepository->findByIdAndUserId($id, $userId);

      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 予約済みのレッスンは更新できない
      if ($lesson->is_reserved) {
        return ResponseHelper::error('Cannot update a reserved lesson.', 400);
      }

      // Lessonを更新
      $updatedLesson = $this->lessonRepository->update($id, $data);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      $user = $this->userRepository->getById($updatedLesson->user_id);

      // Lessonにuserを設定
      $updatedLesson->setRelation('user', $user);

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while updating not reserved lesson.',
        500,
        $e
      );
    }
  }

  /**
   * Delete a not reserved lesson for clients.
   *
   * @param int $id
   * @param int $userId
   * @return JsonResponse
   */
  public function deleteClientNotReservedLesson(int $id, int $userId): JsonResponse
  {
    try {
      // user_idで絞り込んでLessonを取得
      $lesson = $this->lessonRepository->findByIdAndUserId($id, $userId);

      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 予約済みのレッスンは削除できない
      if ($lesson->is_reserved) {
        return ResponseHelper::error('Cannot delete a reserved lesson.', 400);
      }

      $deleted = $this->lessonRepository->delete($id);
      if (!$deleted) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      return ResponseHelper::success(null, 'Lesson deleted successfully.', 200);
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while deleting not reserved lesson.',
        500,
        $e
      );
    }
  }

  /**
   * Get reserved lessons list for clients.
   *
   * @param int $userId
   * @return Collection|JsonResponse
   */
  public function getClientReservedLessons(int $userId): Collection|JsonResponse
  {
    try {
      // 各ドメインのRepositoryからデータを取得
      $lessons = $this->lessonRepository->getReservedByUserId($userId);
      $user = $this->userRepository->getById($userId);

      // 各Lessonにuserを設定
      foreach ($lessons as $lesson) {
        $lesson->setRelation('user', $user);
      }

      // レッスンが0件の場合も空のコレクションを返す
      return $lessons;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while fetching reserved lessons.',
        500,
        $e
      );
    }
  }

  /**
   * Confirm a reserved lesson for clients.
   *
   * @param int $id
   * @param int $userId
   * @return \App\Models\Lesson|JsonResponse
   */
  public function confirmClientReservedLesson(int $id, int $userId): \App\Models\Lesson|JsonResponse
  {
    try {
      // user_idで絞り込んでLessonを取得
      $lesson = $this->lessonRepository->findByIdAndUserId($id, $userId);

      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 予約済みでないレッスンは確認できない
      if (!$lesson->is_reserved) {
        return ResponseHelper::error('Cannot confirm a lesson that is not reserved.', 400);
      }

      // 既に確認済みの場合はエラー
      if ($lesson->is_confirmed) {
        return ResponseHelper::error('Lesson is already confirmed.', 400);
      }

      // Lessonを更新
      $updatedLesson = $this->lessonRepository->update($id, ['is_confirmed' => true]);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      $user = $this->userRepository->getById($updatedLesson->user_id);

      // Lessonにuserを設定
      $updatedLesson->setRelation('user', $user);

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while confirming reserved lesson.',
        500,
        $e
      );
    }
  }

  /**
   * Unconfirm a reserved lesson for clients.
   *
   * @param int $id
   * @param int $userId
   * @return \App\Models\Lesson|JsonResponse
   */
  public function unconfirmClientReservedLesson(int $id, int $userId): \App\Models\Lesson|JsonResponse
  {
    try {
      // user_idで絞り込んでLessonを取得
      $lesson = $this->lessonRepository->findByIdAndUserId($id, $userId);

      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 予約済みでないレッスンは未確認にできない
      if (!$lesson->is_reserved) {
        return ResponseHelper::error('Cannot unconfirm a lesson that is not reserved.', 400);
      }

      // 既に未確認の場合はエラー
      if (!$lesson->is_confirmed) {
        return ResponseHelper::error('Lesson is already unconfirmed.', 400);
      }

      // Lessonを更新
      $updatedLesson = $this->lessonRepository->update($id, ['is_confirmed' => false]);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      $user = $this->userRepository->getById($updatedLesson->user_id);

      // Lessonにuserを設定
      $updatedLesson->setRelation('user', $user);

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while unconfirming reserved lesson.',
        500,
        $e
      );
    }
  }

  /**
   * Cancel a reserved lesson for clients.
   *
   * @param int $id
   * @param int $userId
   * @return \App\Models\Lesson|JsonResponse
   */
  public function cancelClientReservedLesson(int $id, int $userId): \App\Models\Lesson|JsonResponse
  {
    try {
      // user_idで絞り込んでLessonを取得
      $lesson = $this->lessonRepository->findByIdAndUserId($id, $userId);

      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 既にキャンセル済みの場合はエラー
      if ($lesson->is_canceled) {
        return ResponseHelper::error('Lesson is already canceled.', 400);
      }

      // Lessonを更新
      $updatedLesson = $this->lessonRepository->update($id, ['is_canceled' => true]);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      $user = $this->userRepository->getById($updatedLesson->user_id);

      // Lessonにuserを設定
      $updatedLesson->setRelation('user', $user);

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while canceling lesson.',
        500,
        $e
      );
    }
  }

  /**
   * Not cancel a reserved lesson for clients.
   *
   * @param int $id
   * @param int $userId
   * @return \App\Models\Lesson|JsonResponse
   */
  public function notCancelClientReservedLesson(int $id, int $userId): \App\Models\Lesson|JsonResponse
  {
    try {
      // user_idで絞り込んでLessonを取得
      $lesson = $this->lessonRepository->findByIdAndUserId($id, $userId);

      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 既にキャンセルされていない場合はエラー
      if (!$lesson->is_canceled) {
        return ResponseHelper::error('Lesson is already not canceled.', 400);
      }

      // Lessonを更新
      $updatedLesson = $this->lessonRepository->update($id, ['is_canceled' => false]);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      $user = $this->userRepository->getById($updatedLesson->user_id);

      // Lessonにuserを設定
      $updatedLesson->setRelation('user', $user);

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while not canceling lesson.',
        500,
        $e
      );
    }
  }

  /**
   * Get not reserved lessons list for coaches.
   *
   * @param int $coachId
   * @return Collection|JsonResponse
   */
  public function getCoachNotReservedLessons(int $coachId): Collection|JsonResponse
  {
    try {
      // コーチに紐づくクライアントを取得
      $clients = $this->userRepository->getClientsByCoachId($coachId);
      $clientIds = $clients->pluck('id')->toArray();

      // クライアントのレッスンを取得（予約済み・未予約問わず）
      // クライアントが0件の場合もgetByUserIdsが空のコレクションを返す
      $lessons = $this->lessonRepository->getByUserIds($clientIds);

      // 各Lessonにuserを設定
      $usersById = $clients->keyBy('id');
      foreach ($lessons as $lesson) {
        $user = $usersById->get($lesson->user_id);
        $lesson->setRelation('user', $user);
      }

      // レッスンが0件の場合も空のコレクションを返す
      return $lessons;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while fetching lessons.',
        500,
        $e
      );
    }
  }

  /**
   * Reserve a lesson for coaches (set is_reserved to true).
   *
   * @param int $id
   * @param int $coachId
   * @param array<string, mixed> $data
   * @return \App\Models\Lesson|JsonResponse
   */
  public function reserveCoachLesson(int $id, int $coachId, array $data): \App\Models\Lesson|JsonResponse
  {
    try {
      // コーチに紐づくクライアントを取得
      $clients = $this->userRepository->getClientsByCoachId($coachId);
      $clientIds = $clients->pluck('id')->toArray();

      // クライアントが0件の場合はエラー
      if (empty($clientIds)) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // レッスンIDとクライアントIDでレッスンを取得
      $lesson = $this->lessonRepository->findByIdAndUserIds($id, $clientIds);
      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 既に予約済みの場合はエラー
      if ($lesson->is_reserved) {
        return ResponseHelper::error('Lesson is already reserved.', 400);
      }

      // Lessonを更新
      $updateData = array_merge(['is_reserved' => true], $data);
      $updatedLesson = $this->lessonRepository->update($id, $updateData);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      $user = $this->userRepository->getById($updatedLesson->user_id);

      // Lessonにuserを設定
      $updatedLesson->setRelation('user', $user);

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while reserving lesson.',
        500,
        $e
      );
    }
  }

  /**
   * Unreserve a lesson for coaches (set is_reserved to false).
   *
   * @param int $id
   * @param int $coachId
   * @return \App\Models\Lesson|JsonResponse
   */
  public function unreserveCoachLesson(int $id, int $coachId): \App\Models\Lesson|JsonResponse
  {
    try {
      // コーチに紐づくクライアントを取得
      $clients = $this->userRepository->getClientsByCoachId($coachId);
      $clientIds = $clients->pluck('id')->toArray();

      // クライアントが0件の場合はエラー
      if (empty($clientIds)) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // レッスンIDとクライアントIDでレッスンを取得
      $lesson = $this->lessonRepository->findByIdAndUserIds($id, $clientIds);
      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 既に未予約の場合はエラー
      if (!$lesson->is_reserved) {
        return ResponseHelper::error('Lesson is already not reserved.', 400);
      }

      // Lessonを更新
      $updatedLesson = $this->lessonRepository->update($id, ['is_reserved' => false]);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      $user = $this->userRepository->getById($updatedLesson->user_id);

      // Lessonにuserを設定
      $updatedLesson->setRelation('user', $user);

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while unreserving lesson.',
        500,
        $e
      );
    }
  }

  /**
   * Get reserved lessons list for coaches.
   *
   * @param int $coachId
   * @return Collection|JsonResponse
   */
  public function getCoachReservedLessons(int $coachId): Collection|JsonResponse
  {
    try {
      // コーチに紐づくクライアントを取得
      $clients = $this->userRepository->getClientsByCoachId($coachId);
      $clientIds = $clients->pluck('id')->toArray();

      // クライアントの予約済みレッスンを取得
      // クライアントが0件の場合もgetReservedByUserIdsが空のコレクションを返す
      $lessons = $this->lessonRepository->getReservedByUserIds($clientIds);

      // 各Lessonにuserを設定
      $usersById = $clients->keyBy('id');
      foreach ($lessons as $lesson) {
        $user = $usersById->get($lesson->user_id);
        $lesson->setRelation('user', $user);
      }

      // レッスンが0件の場合も空のコレクションを返す
      return $lessons;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while fetching reserved lessons.',
        500,
        $e
      );
    }
  }

  /**
   * Cancel a reserved lesson for coaches (set is_canceled to true, is_reserved to false, is_confirmed to false).
   *
   * @param int $id
   * @param int $coachId
   * @return \App\Models\Lesson|JsonResponse
   */
  public function cancelCoachReservedLesson(int $id, int $coachId): \App\Models\Lesson|JsonResponse
  {
    try {
      // コーチに紐づくクライアントを取得
      $clients = $this->userRepository->getClientsByCoachId($coachId);
      $clientIds = $clients->pluck('id')->toArray();

      // クライアントが0件の場合はエラー
      if (empty($clientIds)) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // レッスンIDとクライアントIDでレッスンを取得
      $lesson = $this->lessonRepository->findByIdAndUserIds($id, $clientIds);
      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 既にキャンセル済みの場合はエラー
      if ($lesson->is_canceled) {
        return ResponseHelper::error('Lesson is already canceled.', 400);
      }

      // Lessonを更新
      $updatedLesson = $this->lessonRepository->update($id, [
        'is_canceled' => true,
        'is_reserved' => false,
        'is_confirmed' => false,
      ]);

      if (!$updatedLesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      $user = $this->userRepository->getById($updatedLesson->user_id);

      // Lessonにuserを設定
      $updatedLesson->setRelation('user', $user);

      return $updatedLesson;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while canceling lesson.',
        500,
        $e
      );
    }
  }

  /**
   * Get lesson condition and review information for coaches.
   *
   * @param int $id
   * @param int $coachId
   * @return \App\Models\Lesson|JsonResponse
   */
  public function getCoachLessonConditionReview(int $id, int $coachId): \App\Models\Lesson|JsonResponse
  {
    try {
      // コーチに紐づくクライアントを取得
      $clients = $this->userRepository->getClientsByCoachId($coachId);
      $clientIds = $clients->pluck('id')->toArray();

      // レッスンIDとクライアントIDでレッスンを取得
      $lesson = $this->lessonRepository->findByIdAndUserIds($id, $clientIds);
      if (!$lesson) {
        return ResponseHelper::notFound('Lesson not found.');
      }

      // 各ドメインのRepositoryからデータを取得
      $conditions = $this->conditionRepository->getByLessonIds([$lesson->id]);
      $reviews = $this->reviewRepository->getByLessonIds([$lesson->id]);
      $user = $this->userRepository->getById($lesson->user_id);

      // Lessonにconditions、reviews、userを設定
      $lesson->setRelation('conditions', $conditions);
      $lesson->setRelation('reviews', $reviews);
      $lesson->setRelation('user', $user);

      return $lesson;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while fetching lesson condition and review information.',
        500,
        $e
      );
    }
  }
}
