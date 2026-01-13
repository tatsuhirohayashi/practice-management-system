<?php

namespace Database\Seeders;

use App\Models\Condition;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Seeder;

class ConditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // すべてのクライアントを取得
        $clients = User::where('role', 'client')->get();

        // 各クライアントのレッスンに対してコンディションを作成
        foreach ($clients as $client) {
            $lessons = Lesson::where('user_id', $client->id)->get();

            foreach ($lessons as $lesson) {
                Condition::factory()->create([
                    'user_id' => $client->id,
                    'lesson_id' => $lesson->id,
                ]);
            }
        }
    }
}
