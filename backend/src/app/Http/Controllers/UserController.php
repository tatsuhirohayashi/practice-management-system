<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCoachClientRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\GetCoachClientsRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\LoginResponseResource;
use App\Http\Resources\UserResource;
use App\Services\Interfaces\UserServiceInterface;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(
        private readonly UserServiceInterface $userService
    ) {}

    /**
     * Create a new client user for coaches.
     */
    public function createCoachClient(CreateCoachClientRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $result = $this->userService->createCoachClient($validated);

        if ($result instanceof JsonResponse) {
            return $result;
        }

        return UserResource::make($result)->response()->setStatusCode(201);
    }

    /**
     * Get clients list for coaches.
     */
    public function getCoachClients(GetCoachClientsRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $result = $this->userService->getCoachClients($validated);

        if ($result instanceof JsonResponse) {
            return $result;
        }

        return UserResource::collection($result)->response()->setStatusCode(200);
    }

    /**
     * Login for clients.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $result = $this->userService->login($validated);

        if ($result instanceof JsonResponse) {
            return $result;
        }

        return LoginResponseResource::make($result)->response()->setStatusCode(200);
    }

    /**
     * Register a new coach user.
     */
    public function registerCoach(CreateUserRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $result = $this->userService->createCoach($validated);

        if ($result instanceof JsonResponse) {
            return $result;
        }

        return LoginResponseResource::make($result)->response()->setStatusCode(201);
    }
}
