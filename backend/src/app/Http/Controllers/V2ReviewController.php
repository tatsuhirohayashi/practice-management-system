<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateReviewRequest;
use App\Http\Requests\GetClientReviewDetailRequest;
use App\Http\Requests\GetClientReviewListRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Http\Resources\ReviewDetailResource;
use App\Http\Resources\ReviewListResource;
use App\Services\Interfaces\V2ReviewServiceInterface;
use Illuminate\Http\JsonResponse;

class V2ReviewController extends Controller
{
  public function __construct(
    private readonly V2ReviewServiceInterface $reviewService
  ) {}

  /**
   * Get review list for clients.
   */
  public function getClientReviewList(GetClientReviewListRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->reviewService->getClientReviewList($userId);

    return ReviewListResource::collection($result)->response()->setStatusCode(200);
  }

  /**
   * Get review detail for clients.
   */
  public function getClientReviewDetail(int $id, GetClientReviewDetailRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $userId = (int)$validated['user_id'];

    $result = $this->reviewService->getClientReviewDetail($id, $userId);

    return ReviewDetailResource::make($result)->response()->setStatusCode(200);
  }

  /**
   * Create a new review for clients.
   */
  public function createClientReview(CreateReviewRequest $request): JsonResponse
  {
    $validated = $request->validated();

    $result = $this->reviewService->createClientReview($validated);

    return ReviewDetailResource::make($result)->response()->setStatusCode(201);
  }

  /**
   * Update a review for clients.
   */
  public function updateClientReview(int $id, UpdateReviewRequest $request): JsonResponse
  {
    $validated = $request->validated();

    $result = $this->reviewService->updateClientReview($id, $validated);

    return ReviewDetailResource::make($result)->response()->setStatusCode(200);
  }
}
