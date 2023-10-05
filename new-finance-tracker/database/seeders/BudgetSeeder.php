<?php

namespace Database\Seeders;

use App\Models\Budget;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BudgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            ['category_name' => 'Food and Beverages', 'amount' => '10000', 'user_id' => 1],
            ['category_name' => 'Mobile Bill', 'amount' => '1000', 'user_id' => 1],
            ['category_name' => 'Electricity Bill', 'amount' => '3700', 'user_id' => 1],
            ['category_name' => 'Travelling', 'amount' => '4500', 'user_id' => 1],
            ['category_name' => 'Utilities ', 'amount' => '2000', 'user_id' => 1],
            ['category_name' => 'Insurance ', 'amount' => '6000', 'user_id' => 1],
            ['category_name' => 'Medical & Healthcare', 'amount' => '8500', 'user_id' => 1],
            ['category_name' => 'Personal Spending', 'amount' => '3300', 'user_id' => 1]
        ];

        Budget::insert($data);
    }
}
