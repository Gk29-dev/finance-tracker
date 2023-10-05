<?php

namespace Database\Seeders;

use App\Models\Income;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IncomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            ['income_date' => '2023-10-01', 'source' => 'Rent', 'amount' => '7000', 'user_id' => 1],
            ['income_date' => '2023-10-02', 'source' => 'Salaries and wages', 'amount' => '20000', 'user_id' => 1],
            ['income_date' => '2023-10-03', 'source' => 'Freelancing', 'amount' => '15000', 'user_id' => 1],
            ['income_date' => '2023-10-04', 'source' => 'Pensions', 'amount' => '2500', 'user_id' => 1],
            ['income_date' => '2023-10-05', 'source' => 'Crypto', 'amount' => '5000', 'user_id' => 1],
            ['income_date' => '2023-10-06', 'source' => 'NFTs', 'amount' => '6000', 'user_id' => 1],
            ['income_date' => '2023-10-07', 'source' => 'Trading', 'amount' => '8500', 'user_id' => 1],
        ];

        Income::insert($data);
    }
}
