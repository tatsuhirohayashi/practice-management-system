<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Interfaces\UserServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceInterface
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository
    ) {}

    /**
     * Create a new client user for coaches.
     *
     * @param array<string, mixed> $data
     * @return \App\Models\User|JsonResponse
     */
    public function createCoachClient(array $data): \App\Models\User|JsonResponse
    {
        try {
            // クライアントとして登録するため、roleをclientに設定
            $coachId = (int)$data['user_id'];
            $userData = [
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'role' => 'client',
                'coach_id' => $coachId,
            ];

            $user = $this->userRepository->create($userData);

            return $user;
        } catch (\Exception $e) {
            return ResponseHelper::error(
                'An error occurred while creating client user.',
                500,
                $e
            );
        }
    }

    /**
     * Get clients list for coaches.
     *
     * @param array<string, mixed> $data
     * @return Collection|JsonResponse
     */
    public function getCoachClients(array $data): Collection|JsonResponse
    {
        try {
            $coachId = (int)$data['user_id'];

            $clients = $this->userRepository->getClientsByCoachId($coachId);

            // クライアントが0件の場合も空のコレクションを返す
            return $clients;
        } catch (\Exception $e) {
            return ResponseHelper::error(
                'An error occurred while fetching clients list.',
                500,
                $e
            );
        }
    }

    /**
     * Authenticate user and login.
     *
     * @param array<string, mixed> $data
     * @return \App\Models\User|JsonResponse
     */
    public function login(array $data): \App\Models\User|JsonResponse
    {
        try {
            $user = $this->userRepository->findByEmail($data['email']);

            if (!$user) {
                return ResponseHelper::error('Invalid email or password.', 401);
            }

            if (!Hash::check($data['password'], $user->password)) {
                return ResponseHelper::error('Invalid email or password.', 401);
            }

            return $user;
        } catch (\Exception $e) {
            return ResponseHelper::error(
                'An error occurred while logging in.',
                500,
                $e
            );
        }
    }

    /**
     * Register a new coach user.
     *
     * @param array<string, mixed> $data
     * @return \App\Models\User|JsonResponse
     */
    public function createCoach(array $data): \App\Models\User|JsonResponse
    {
        try {
            // コーチとして登録するため、roleをcoachに設定
            $userData = [
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'role' => 'coach',
                'coach_id' => null, // コーチはcoach_idを持たない
            ];

            $user = $this->userRepository->create($userData);

            return $user;
        } catch (\Exception $e) {
            return ResponseHelper::error(
                'An error occurred while creating coach user.',
                500,
                $e
            );
        }
    }
}
