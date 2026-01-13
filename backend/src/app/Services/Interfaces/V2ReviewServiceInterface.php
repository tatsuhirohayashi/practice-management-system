<?php

namespace App\Services\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

interface V2ReviewServiceInterface
{
  /**
   * Get review list for clients.
   *
   * @param int $userId
   * @return Collection|JsonResponse
   */
  public function getClientReviewList(int $userId): Collection|JsonResponse;

  /**
   * Get review detail for clients.
   *
   * @param int $id
   * @param int $userId
   * @return \App\Models\Review|JsonResponse
   */
  public function getClientReviewDetail(int $id, int $userId): \App\Models\Review|JsonResponse;

  /**
   * Create a new review for clients.
   *
   * @param array<string, mixed> $data
   * @return \App\Models\Review|JsonResponse
   */
  public function createClientReview(array $data): \App\Models\Review|JsonResponse;

  /**
   * Update a review for clients.
   *
   * @param int $id
   * @param array<string, mixed> $data
   * @return \App\Models\Review|JsonResponse
   */
  public function updateClientReview(int $id, array $data): \App\Models\Review|JsonResponse;
}
