<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateConditionRequest;
use App\Http\Requests\GetClientConditionDetailRequest;
use App\Http\Requests\GetClientConditionListRequest;
use App\Http\Requests\UpdateConditionRequest;
use App\Http\Resources\ConditionDetailResource;
use App\Http\Resources\ConditionListResource;
use App\Services\Interfaces\V2ConditionServiceInterface;
use Illuminate\Http\JsonResponse;

class V2ConditionController extends Controller
{
  public function __construct(
    private readonly V2ConditionServiceInterface $conditionService
  ) {}

  /**
   * Get condition list for clients.
   */
  public function getClientConditionList(GetClientConditionListRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->conditionService->getClientConditionList($userId);

    return ConditionListResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Get condition detail for clients.
   */
  public function getClientConditionDetail(int $id, GetClientConditionDetailRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->conditionService->getClientConditionDetail($id, $userId);

    return ConditionDetailResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Create a new condition for clients.
   */
  public function createClientCondition(CreateConditionRequest $request): JsonResponse
  {
    $validated = $request->validated();

    $result = $this->conditionService->createClientCondition($validated);

    return ConditionDetailResource::make($result)->response()->setStatusCode(201);
  }

  /**
   * Update a condition for clients.
   */
  public function updateClientCondition(int $id, UpdateConditionRequest $request): JsonResponse
  {
    $validated = $request->validated();

    $result = $this->conditionService->updateClientCondition($id, $validated);

    return ConditionDetailResource::make($result)->response()->setStatusCode(200);
  }
}
