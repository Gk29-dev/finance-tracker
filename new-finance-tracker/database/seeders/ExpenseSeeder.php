<?php

namespace Database\Seeders;

use App\Models\Expense;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            ['expense_date' => '2023-10-01', 'budget_id' => 1, 'amount' => '7000', 'user_id' => 1, 'status' => 1],
            ['expense_date' => '2023-10-02', 'budget_id' => 2, 'amount' => '20000', 'user_id' => 1, 'status' => 3],
            ['expense_date' => '2023-10-03', 'budget_id' => 3, 'amount' => '15000', 'user_id' => 1, 'status' => 3],
            ['expense_date' => '2023-10-04', 'budget_id' => 4, 'amount' => '2500', 'user_id' => 1, 'status' => 1],
            ['expense_date' => '2023-10-05', 'budget_id' => 5, 'amount' => '5000', 'user_id' => 1, 'status' => 3],
            ['expense_date' => '2023-10-06', 'budget_id' => 6, 'amount' => '6000', 'user_id' => 1, 'status' => 2],
            ['expense_date' => '2023-10-07', 'budget_id' => 7, 'amount' => '8500', 'user_id' => 1, 'status' => 2],
        ];

        Expense::insert($data);
    }
}
