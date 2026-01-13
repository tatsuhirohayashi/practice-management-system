<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Repositories\Interfaces\ReviewRepositoryInterface;
use App\Services\Interfaces\ReviewServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewService implements ReviewServiceInterface
{
    public function __construct(
        private readonly ReviewRepositoryInterface $reviewRepository
    ) {}

    /**
     * Get review list for clients.
     *
     * @param Request $request
     * @return Collection|JsonResponse
     */
    public function getClientReviewList(Request $request): Collection|JsonResponse
    {
        try {
            $validated = $request->validated();
            $userId = (int)$validated['user_id'];
            $lessons = $this->reviewRepository->getLessonsWithReviews($userId);

            // レッスンが0件の場合も空のコレクションを返す
            return $lessons;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while fetching review list.'
            );
        }
    }

    /**
     * Get review detail for clients.
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Review|JsonResponse
     */
    public function getClientReviewDetail(int $id, Request $request): \App\Models\Review|JsonResponse
    {
        try {
            $review = $this->reviewRepository->findById($id);

            if (!$review) {
                return ResponseHelper::notFound('Review not found.');
            }

            return $review;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while fetching review detail.'
            );
        }
    }

    /**
     * Create a new review for clients.
     *
     * @param Request $request
     * @return \App\Models\Review|JsonResponse
     */
    public function createClientReview(Request $request): \App\Models\Review|JsonResponse
    {
        try {
            $validated = $request->validated();

            $reviewData = array_merge($validated, [
                'user_id' => $request->user_id ?? 1, // TODO: 認証実装後に認証済みユーザーのIDを使用
            ]);

            $review = $this->reviewRepository->create($reviewData);

            // リレーションを読み込む
            $review->load(['lesson:id,lesson_day,lesson_location', 'user:id,first_name,last_name']);

            return $review;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while creating review.'
            );
        }
    }

    /**
     * Update a review for clients.
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Review|JsonResponse
     */
    public function updateClientReview(int $id, Request $request): \App\Models\Review|JsonResponse
    {
        try {
            $validated = $request->validated();

            $updatedReview = $this->reviewRepository->update($id, $validated);

            if (!$updatedReview) {
                return ResponseHelper::notFound('Review not found.');
            }

            return $updatedReview;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while updating review.'
            );
        }
    }
}
