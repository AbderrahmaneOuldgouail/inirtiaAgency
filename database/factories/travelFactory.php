<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\travel>
 */
class travelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    
    {
        return [
            'name' => fake()->lastName(),
            'description' => fake()->sentence(15),
            'default_price' => fake()->randomFloat(2, 100, 10000),
            'type' => Str::repeat(fake()->randomElement(['travel', 'omra']), 1),
            'distance' => rand(50, 2000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
    
}
