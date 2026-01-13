<?php

namespace App\Services\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

interface V2ConditionServiceInterface
{
    /**
     * Get condition list for clients.
     *
     * @param int $userId
     * @return Collection|JsonResponse
     */
    public function getClientConditionList(int $userId): Collection|JsonResponse;

    /**
     * Get condition detail for clients.
     *
     * @param int $id
     * @param int $userId
     * @return \App\Models\Condition|JsonResponse
     */
    public function getClientConditionDetail(int $id, int $userId): \App\Models\Condition|JsonResponse;

    /**
     * Create a new condition for clients.
     *
     * @param array<string, mixed> $data
     * @return \App\Models\Condition|JsonResponse
     */
    public function createClientCondition(array $data): \App\Models\Condition|JsonResponse;

    /**
     * Update a condition for clients.
     *
     * @param int $id
     * @param array<string, mixed> $data
     * @return \App\Models\Condition|JsonResponse
     */
    public function updateClientCondition(int $id, array $data): \App\Models\Condition|JsonResponse;
}
