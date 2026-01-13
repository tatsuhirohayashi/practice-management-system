<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // すべてのクライアントを取得
        $clients = User::where('role', 'client')->get();

        // 各クライアントに対して10個のレッスンを作成（1ヶ月先の日時）
        foreach ($clients as $client) {
            for ($i = 0; $i < 10; $i++) {
                Lesson::factory()->create([
                    'user_id' => $client->id,
                    'lesson_day' => now()->addMonth()->addDays($i)->setTime(10, 0, 0), // 10時00分に設定
                ]);
            }
        }
    }
}

