<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateReviewRequest;
use App\Http\Requests\GetClientReviewDetailRequest;
use App\Http\Requests\GetClientReviewListRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Http\Resources\ReviewDetailResource;
use App\Http\Resources\ReviewListResource;
use App\Services\Interfaces\ReviewServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function __construct(
        private readonly ReviewServiceInterface $reviewService
    ) {}

    /**
     * Get review list for clients.
     */
    public function getClientReviewList(GetClientReviewListRequest $request): JsonResponse
    {
        $result = $this->reviewService->getClientReviewList($request);

        return ReviewListResource::collection($result)->response()->setStatusCode(200);
    }

    /**
     * Get review detail for clients.
     */
    public function getClientReviewDetail(int $id, GetClientReviewDetailRequest $request): JsonResponse
    {
        $result = $this->reviewService->getClientReviewDetail($id, $request);

        return ReviewDetailResource::make($result)->response()->setStatusCode(200);
    }

    /**
     * Create a new review for clients.
     */
    public function createClientReview(CreateReviewRequest $request): JsonResponse
    {
        $result = $this->reviewService->createClientReview($request);

        return ReviewDetailResource::make($result)->response()->setStatusCode(201);
    }

    /**
     * Update a review for clients.
     */
    public function updateClientReview(int $id, UpdateReviewRequest $request): JsonResponse
    {
        $result = $this->reviewService->updateClientReview($id, $request);

        return ReviewDetailResource::make($result)->response()->setStatusCode(200);
    }
}
