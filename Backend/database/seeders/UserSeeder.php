<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nama_user' => 'Administrator',
            'role' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'admin',
            'last_login' => now()
        ]);

        User::create([
            'nama_user' => 'Fariz',
            'role' => 'user',
            'email' => 'fariz@coba.com',
            'password' => 'anime',
            'last_login' => now()
        ]);

        // User::factory()->count(50)->create();
    }
}
