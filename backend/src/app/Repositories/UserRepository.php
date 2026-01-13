<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Create a new user.
     *
     * @param array<string, mixed> $data
     * @return User
     */
    public function create(array $data): User
    {
        // パスワードをハッシュ化
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return User::create($data);
    }

    /**
     * Get clients by coach ID.
     *
     * @param int $coachId
     * @return \Illuminate\Database\Eloquent\Collection<User>
     */
    public function getClientsByCoachId(int $coachId): \Illuminate\Database\Eloquent\Collection
    {
        return User::where('coach_id', $coachId)
            ->where('role', 'client')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Find a user by email.
     *
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }
}
