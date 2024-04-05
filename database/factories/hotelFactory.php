<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\hotel>
 */
class hotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'adresse' => fake()->address(),
            'rating' =>  rand(1, 5),
            'descreption'=>fake()->sentence(15),
            'default_price' => fake()->randomFloat(2, 100, 10000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
