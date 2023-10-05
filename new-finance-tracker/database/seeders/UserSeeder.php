<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
       User::create([
          'name' => 'Gaurav Kumar',
          'email' => 'user@gmail.com',
          'password' => Hash::make('user@123'),
          'age' => 25,
          'address' => 'kalkaji new delhi-110019'
       ]);
    }
}
