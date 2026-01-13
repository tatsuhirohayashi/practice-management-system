<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Repositories\Interfaces\V2ConditionRepositoryInterface;
use App\Repositories\Interfaces\V2LessonRepositoryInterface;
use App\Repositories\Interfaces\V2UserRepositoryInterface;
use App\Services\Interfaces\V2ConditionServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class V2ConditionService implements V2ConditionServiceInterface
{
  public function __construct(
    private readonly V2ConditionRepositoryInterface $conditionRepository,
    private readonly V2LessonRepositoryInterface $lessonRepository,
    private readonly V2UserRepositoryInterface $userRepository
  ) {}

  /**
   * Get condition list for clients.
   *
   * @param int $userId
   * @return Collection|JsonResponse
   */
  public function getClientConditionList(int $userId): Collection|JsonResponse
  {
    try {
      // 各ドメインのRepositoryからデータを取得
      $lessons = $this->lessonRepository->getByUserId($userId);
      $lessonIds = $lessons->pluck('id')->toArray();
      $conditions = $this->conditionRepository->getByLessonIds($lessonIds);
      $user = $this->userRepository->getById($userId);

      // 条件をlesson_idでキー化（1:1の関係のため）
      $conditionsByLessonId = $conditions->keyBy('lesson_id');

      // 各Lessonにconditionsとuserを設定
      foreach ($lessons as $lesson) {
        $condition = $conditionsByLessonId->get($lesson->id);
        $lessonConditions = $condition ? new Collection([$condition]) : new Collection();
        $lesson->setRelation('conditions', $lessonConditions);
        $lesson->setRelation('user', $user);
      }

      // レッスンが0件の場合も空のコレクションを返す
      return $lessons;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while fetching condition list.',
        500,
        $e
      );
    }
  }

  /**
   * Get condition detail for clients.
   *
   * @param int $id
   * @param int $userId
   * @return \App\Models\Condition|JsonResponse
   */
  public function getClientConditionDetail(int $id, int $userId): \App\Models\Condition|JsonResponse
  {
    try {
      // 各ドメインのRepositoryからデータを取得（user_idで絞り込み）
      $condition = $this->conditionRepository->findByIdAndUserId($id, $userId);

      if (!$condition) {
        return ResponseHelper::notFound('Condition not found.');
      }

      $lesson = $this->lessonRepository->findById($condition->lesson_id);
      $user = $this->userRepository->getById($condition->user_id);

      // Conditionにlessonとuserを設定
      $condition->setRelation('lesson', $lesson);
      $condition->setRelation('user', $user);

      return $condition;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while fetching condition detail.',
        500,
        $e
      );
    }
  }

  /**
   * Create a new condition for clients.
   *
   * @param array<string, mixed> $data
   * @return \App\Models\Condition|JsonResponse
   */
  public function createClientCondition(array $data): \App\Models\Condition|JsonResponse
  {
    try {
      // 各ドメインのRepositoryからデータを取得
      $condition = $this->conditionRepository->create($data);

      $lesson = $this->lessonRepository->findById($condition->lesson_id);
      $user = $this->userRepository->getById($condition->user_id);

      // Conditionにlessonとuserを設定
      $condition->setRelation('lesson', $lesson);
      $condition->setRelation('user', $user);

      return $condition;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while creating condition.',
        500,
        $e
      );
    }
  }

  /**
   * Update a condition for clients.
   *
   * @param int $id
   * @param array<string, mixed> $data
   * @return \App\Models\Condition|JsonResponse
   */
  public function updateClientCondition(int $id, array $data): \App\Models\Condition|JsonResponse
  {
    try {
      // user_idで絞り込んでConditionを取得
      $userId = (int)$data['user_id'];
      $condition = $this->conditionRepository->findByIdAndUserId($id, $userId);

      if (!$condition) {
        return ResponseHelper::notFound('Condition not found.');
      }

      // Conditionを更新
      $updatedCondition = $this->conditionRepository->update($id, $data);

      if (!$updatedCondition) {
        return ResponseHelper::notFound('Condition not found.');
      }

      $lesson = $this->lessonRepository->findById($updatedCondition->lesson_id);
      $user = $this->userRepository->getById($updatedCondition->user_id);

      // Conditionにlessonとuserを設定
      $updatedCondition->setRelation('lesson', $lesson);
      $updatedCondition->setRelation('user', $user);

      return $updatedCondition;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while updating condition.',
        500,
        $e
      );
    }
  }
}
