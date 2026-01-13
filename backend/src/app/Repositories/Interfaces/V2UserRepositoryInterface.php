<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface V2UserRepositoryInterface
{
    /**
     * Get user by ID.
     *
     * @param int $userId
     * @return User|null
     */
    public function getById(int $userId): ?User;

    /**
     * Get clients by coach ID.
     *
     * @param int $coachId
     * @return \Illuminate\Database\Eloquent\Collection<User>
     */
    public function getClientsByCoachId(int $coachId): \Illuminate\Database\Eloquent\Collection;
}
