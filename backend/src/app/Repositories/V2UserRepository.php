<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\V2UserRepositoryInterface;

class V2UserRepository implements V2UserRepositoryInterface
{
  /**
   * Get user by ID.
   *
   * @param int $userId
   * @return User|null
   */
  public function getById(int $userId): ?User
  {
    return User::find($userId);
  }

  /**
   * Get clients by coach ID.
   *
   * @param int $coachId
   * @return \Illuminate\Database\Eloquent\Collection<User>
   */
  public function getClientsByCoachId(int $coachId): \Illuminate\Database\Eloquent\Collection
  {
    return User::where('coach_id', $coachId)->get();
  }
}
