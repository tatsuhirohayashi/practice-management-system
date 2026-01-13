<?php

namespace App\Services\Interfaces;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

interface UserServiceInterface
{
    /**
     * Create a new client user for coaches.
     *
     * @param array<string, mixed> $data
     * @return User|JsonResponse
     */
    public function createCoachClient(array $data): User|JsonResponse;

    /**
     * Get clients list for coaches.
     *
     * @param array<string, mixed> $data
     * @return Collection|JsonResponse
     */
    public function getCoachClients(array $data): Collection|JsonResponse;

    /**
     * Authenticate user and login.
     *
     * @param array<string, mixed> $data
     * @return User|JsonResponse
     */
    public function login(array $data): User|JsonResponse;

    /**
     * Register a new coach user.
     *
     * @param array<string, mixed> $data
     * @return User|JsonResponse
     */
    public function createCoach(array $data): User|JsonResponse;
}
