<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Review::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Seederで上書きされる
            'lesson_id' => Lesson::factory(), // Seederで上書きされる
            'forehand' => fake()->numberBetween(1, 5),
            'backhand' => fake()->numberBetween(1, 5),
            'serve' => fake()->numberBetween(1, 5),
            'volley' => fake()->numberBetween(1, 5),
            'return' => fake()->numberBetween(1, 5),
            'serve_in' => fake()->numberBetween(0, 100),
            'return_in' => fake()->numberBetween(0, 100),
        ];
    }
}
