<?php

namespace App\Services\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

interface ConditionServiceInterface
{
    /**
     * Get condition list for clients.
     *
     * @param Request $request
     * @return Collection|JsonResponse
     */
    public function getClientConditionList(Request $request): Collection|JsonResponse;

    /**
     * Get condition detail for clients.
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Condition|JsonResponse
     */
    public function getClientConditionDetail(int $id, Request $request): \App\Models\Condition|JsonResponse;

    /**
     * Create a new condition for clients.
     *
     * @param Request $request
     * @return \App\Models\Condition|JsonResponse
     */
    public function createClientCondition(Request $request): \App\Models\Condition|JsonResponse;

    /**
     * Update a condition for clients.
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Condition|JsonResponse
     */
    public function updateClientCondition(int $id, Request $request): \App\Models\Condition|JsonResponse;
}

