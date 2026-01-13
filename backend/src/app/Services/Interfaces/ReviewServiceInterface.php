<?php

namespace App\Services\Interfaces;

use App\Models\Review;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

interface ReviewServiceInterface
{
    /**
     * Get review list for clients.
     *
     * @param Request $request
     * @return Collection|JsonResponse
     */
    public function getClientReviewList(Request $request): Collection|JsonResponse;

    /**
     * Get review detail for clients.
     *
     * @param int $id
     * @param Request $request
     * @return Review|JsonResponse
     */
    public function getClientReviewDetail(int $id, Request $request): Review|JsonResponse;

    /**
     * Create a new review for clients.
     *
     * @param Request $request
     * @return Review|JsonResponse
     */
    public function createClientReview(Request $request): Review|JsonResponse;

    /**
     * Update a review for clients.
     *
     * @param int $id
     * @param Request $request
     * @return Review|JsonResponse
     */
    public function updateClientReview(int $id, Request $request): Review|JsonResponse;
}

