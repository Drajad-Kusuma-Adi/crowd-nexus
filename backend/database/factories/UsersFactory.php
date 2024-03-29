<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class UsersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->safeEmail(),
            'name' => fake()->name(),
            'password' => bcrypt('password'),
            'image' => null,
            'is_admin' => false,
            'banned' => false,
            'token' => null
        ];
    }
}
