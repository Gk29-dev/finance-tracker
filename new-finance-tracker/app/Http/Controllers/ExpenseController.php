<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class ExpenseController extends Controller
{
        //
    
        public function index(Request $request){
            $userId = $request->header('user_id');

            return response()->json([
                'status' => true,
                'message' => 'All expenses of the users',
                'expenses' => Expense::with('budget')->where('user_id', $userId)->get(),
            ]);
        }
    
        public function budgetCategories(Request $request){
            $userId = $request->header('user_id');
            return response()->json([
                'status' => true,
                'message' => 'All budget categories',
                'categories' => Budget::where('user_id', $userId)->get(),
            ]);
        }
        public function store(Request $request){
            //validate the user's income
            $validator = Validator::make($request->all(), [
                'expense_date' => 'required|date',
                'budget_id' => 'required',
                'amount' => 'required',
            ]);
            
            if ($validator->fails()) {
                return response()->json([ 'status' => false, 'message' => 'Validation error','error' => $validator->errors()], 400);
            }
    
            $budgetStatus = $this->checkBudgetStatus($request->user_id, $request->budget_id,$request->amount);

            $userExpense = Expense::create([
                'expense_date' => $request->expense_date,
                'budget_id' => $request->budget_id,
                'amount' =>$request->amount,
                'user_id' => $request->user_id,
                'status' => $budgetStatus
             ]);

             return response()->json([
                'status' => 'success',
                'message' => 'New expenses successfully added!',
                'expense' => $userExpense,
            ]);
        }
    
        public function edit($id){
    
            $expense = Expense::with('budget')->find($id);
    
            if(empty($expense)){
                return response()->json([
                    'status' => false,
                    'message' => 'Expense data not found',
                    'expense' => $expense
                ], 404);
            } 
            return response()->json([
                'status' => true,
                'message' => 'Expense data found',
                'expense' => $expense
            ]);
        }
    
        public function update(Request $request, $id){

            $expense = Expense::find($id);
        
            //validate the user's income
            $validator = Validator::make($request->all(), [
                'expense_date' => 'required|date',
                'budget_id' => "required",
                'amount' => 'required',
            ]);
            
            if ($validator->fails()) {
                return response()->json([ 'status' => false, 'message' => 'Validation error','error' => $validator->errors()], 400);
            }
            $budgetStatus = $this->checkBudgetStatus($request->user_id, $request->budget_id,$request->amount);

            $updateExpenseStatus = $expense->update([
                'expense_date' => $request->expense_date,
                'budget_id' => $request->budget_id,
                'amount' =>$request->amount,
                'user_id' => $request->user_id,
                'status' => $budgetStatus
            ]);

    
            if($updateExpenseStatus){
                return response()->json([
                    'status' => true,
                    'message' => 'Expense data successfully updated!',
                    'data' => Expense::find($id)
                ]); 
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong!',
                    'data' => $expense
                ], 500);
            }
           
    
    
        }
    
        public function destroy($id){
            $expense = Expense::find($id);
    
            if(empty($expense)){
                return response()->json([
                    'status' => false,
                    'message' => 'Expense data not found',
                    'data' => $expense
                ], 404);  
            }else{
                $expense->delete();
    
                return response()->json([
                    'status' => true,
                    'message' => 'Expense data successfully deleted',
                ], 200); 
            }
        }

        private function checkBudgetStatus($userId, $categoryId, $userExpenseAmount){
            $budget = Budget::where('user_id', $userId)->where('id', $categoryId)->first();
            $budgetLimit = $budget['amount'];
            

            if($budgetLimit > $userExpenseAmount){
                return 1;
            }else if($budgetLimit == $userExpenseAmount){
                return 2;
            }else{
                return 3;
            }
        }
}
