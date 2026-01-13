<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateConditionRequest;
use App\Http\Requests\GetClientConditionDetailRequest;
use App\Http\Requests\GetClientConditionListRequest;
use App\Http\Requests\UpdateConditionRequest;
use App\Http\Resources\ConditionDetailResource;
use App\Http\Resources\ConditionListResource;
use App\Services\Interfaces\ConditionServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConditionController extends Controller
{
  public function __construct(
    private readonly ConditionServiceInterface $conditionService
  ) {}

  /**
   * Get condition list for clients.
   */
  public function getClientConditionList(GetClientConditionListRequest $request): JsonResponse
  {
    $result = $this->conditionService->getClientConditionList($request);

    return ConditionListResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Get condition detail for clients.
   */
  public function getClientConditionDetail(int $id, GetClientConditionDetailRequest $request): JsonResponse
  {
    $result = $this->conditionService->getClientConditionDetail($id, $request);

    return ConditionDetailResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Create a new condition for clients.
   */
  public function createClientCondition(CreateConditionRequest $request): JsonResponse
  {
    $result = $this->conditionService->createClientCondition($request);

    return ConditionDetailResource::make($result)->response()->setStatusCode(201);
  }

  /**
   * Update a condition for clients.
   */
  public function updateClientCondition(int $id, UpdateConditionRequest $request): JsonResponse
  {
    $result = $this->conditionService->updateClientCondition($id, $request);

    return ConditionDetailResource::make($result)->response()->setStatusCode(200);
  }
}
