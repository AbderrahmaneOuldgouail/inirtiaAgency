<?php

namespace Database\Seeders;

use App\Models\flight;
use App\Models\hotel;
use App\Models\travel;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        travel::factory(10)->create();
        hotel::factory(10)->create();
        flight::factory(10)->create();
        User::factory(10)->create();


        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
