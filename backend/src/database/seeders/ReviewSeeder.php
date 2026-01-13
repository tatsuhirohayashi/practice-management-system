<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // すべてのクライアントを取得
        $clients = User::where('role', 'client')->get();

        // 各クライアントのレッスンに対してレビューを作成
        foreach ($clients as $client) {
            $lessons = Lesson::where('user_id', $client->id)->get();

            foreach ($lessons as $lesson) {
                Review::factory()->create([
                    'user_id' => $client->id,
                    'lesson_id' => $lesson->id,
                ]);
            }
        }
    }
}
