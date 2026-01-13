<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Repositories\Interfaces\ConditionRepositoryInterface;
use App\Services\Interfaces\ConditionServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConditionService implements ConditionServiceInterface
{
  public function __construct(
    private readonly ConditionRepositoryInterface $conditionRepository
  ) {}

  /**
   * Get condition list for clients.
   *
   * @param Request $request
   * @return Collection|JsonResponse
   */
  public function getClientConditionList(Request $request): Collection|JsonResponse
  {
    try {
      $validated = $request->validated();
      $userId = (int)$validated['user_id'];
      $lessons = $this->conditionRepository->getLessonsWithConditions($userId);

      // レッスンが0件の場合も空のコレクションを返す
      return $lessons;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while fetching condition list.'
      );
    }
  }

  /**
   * Get condition detail for clients.
   *
   * @param int $id
   * @param Request $request
   * @return \App\Models\Condition|JsonResponse
   */
  public function getClientConditionDetail(int $id, Request $request): \App\Models\Condition|JsonResponse
  {
    try {
      $condition = $this->conditionRepository->findById($id);

      if (!$condition) {
        return ResponseHelper::notFound('Condition not found.');
      }

      return $condition;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while fetching condition detail.'
      );
    }
  }

  /**
   * Create a new condition for clients.
   *
   * @param Request $request
   * @return \App\Models\Condition|JsonResponse
   */
  public function createClientCondition(Request $request): \App\Models\Condition|JsonResponse
  {
    try {
      $validated = $request->validated();

      $conditionData = array_merge($validated, [
        'user_id' => $request->user_id ?? 1, // TODO: 認証実装後に認証済みユーザーのIDを使用
      ]);

      $condition = $this->conditionRepository->create($conditionData);

      // リレーションを読み込む
      $condition->load(['lesson:id,lesson_day,lesson_location', 'user:id,first_name,last_name']);

      return $condition;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while creating condition.'
      );
    }
  }

  /**
   * Update a condition for clients.
   *
   * @param int $id
   * @param Request $request
   * @return \App\Models\Condition|JsonResponse
   */
  public function updateClientCondition(int $id, Request $request): \App\Models\Condition|JsonResponse
  {
    try {
      $validated = $request->validated();

      $updatedCondition = $this->conditionRepository->update($id, $validated);

      if (!$updatedCondition) {
        return ResponseHelper::notFound('Condition not found.');
      }

      return $updatedCondition;
    } catch (\Exception $e) {
      return ResponseHelper::handleException(
        $e,
        $request,
        'An error occurred while updating condition.'
      );
    }
  }
}
