<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 2人のコーチを作成
        $coaches = User::factory(2)->create([
            'role' => 'coach',
        ]);

        // 各コーチに対して5人のクライアントを作成
        foreach ($coaches as $coach) {
            User::factory(5)->create([
                'role' => 'client',
                'coach_id' => $coach->id,
            ]);
        }
    }
}

