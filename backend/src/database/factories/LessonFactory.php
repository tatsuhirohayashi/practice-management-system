<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'lesson_day' => fake()->dateTimeBetween('now', '+3 months'),
            'lesson_location' => fake()->randomElement(['スタジオA', 'スタジオB', 'スタジオC', 'オンライン', '公園']),
            'lesson_memo' => fake()->optional()->sentence(),
            'is_reserved' => fake()->boolean(50),
            'is_confirmed' => false,
            'is_canceled' => false,
            'is_finished' => false,
        ];
    }
}

