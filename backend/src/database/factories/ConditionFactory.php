<?php

namespace Database\Factories;

use App\Models\Condition;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Condition>
 */
class ConditionFactory extends Factory
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
            'lesson_id' => Lesson::factory(),
            'musle_pain' => fake()->numberBetween(1, 5),
            'motivation' => fake()->numberBetween(1, 5),
            'feeling' => fake()->numberBetween(1, 5),
            'tired' => fake()->numberBetween(1, 5),
            'condition_memo' => fake()->optional()->realText(200),
        ];
    }
}
