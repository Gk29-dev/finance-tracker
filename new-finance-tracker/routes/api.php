<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::post('logout', [AuthController::class, 'logout']);

    //User's incomes
    Route::get('incomes', [IncomeController::class, 'index']);
    Route::post('income', [IncomeController::class, 'store']);
    Route::get('income/{id}', [IncomeController::class, 'edit']);
    Route::post('income/{id}', [IncomeController::class, 'update']);
    Route::delete('income/{id}', [IncomeController::class, 'destroy']);

    //User's expenses
      Route::get('expenses', [ExpenseController::class, 'index']);
      Route::post('expense', [ExpenseController::class, 'store']);
      Route::get('expense/{id}', [ExpenseController::class, 'edit']);
      Route::post('expense/{id}', [ExpenseController::class, 'update']);
      Route::delete('expense/{id}', [ExpenseController::class, 'destroy']);
      Route::get('categories', [ExpenseController::class, 'budgetCategories']);

      //User's Budget
      Route::get('budgets', [BudgetController::class, 'index']);
      Route::post('budget', [BudgetController::class, 'store']);
      Route::get('budget/{id}', [BudgetController::class, 'edit']);
      Route::post('budget/{id}', [BudgetController::class, 'update']);
      Route::delete('budget/{id}', [BudgetController::class, 'destroy']);

});

