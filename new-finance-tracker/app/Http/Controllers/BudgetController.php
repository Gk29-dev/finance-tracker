<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class BudgetController extends Controller
{
    //
    public function index(Request $request){
        $userId = $request->header('user_id');
       
        return response()->json([
            'status' => true,
            'message' => 'All budget categories of the users',
            'budgets' => Budget::where('user_id', $userId)->get()
        ]);
    }

    public function store(Request $request){
      
        //validate the user's income
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string',
            'amount' => 'required|integer',
        ]);
        
        if ($validator->fails()) {
            return response()->json([ 'status' => false, 'message' => 'Validation error','error' => $validator->errors()], 400);
        }

        $budget = Budget::create([
            'category_name' => $request->category_name,
            'amount' =>$request->amount,
            'user_id' => $request->user_id
         ]);

         if($budget){
            return response()->json([
                'status' => 'success',
                'message' => 'Budget category successfully added!',
                'budget' => $budget,
            ], 200);
         }else{
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
            ], 500);
         }
   
    }

    public function edit($id){
    
        $budget = Budget::find($id);

        if(empty($budget)){
            return response()->json([
                'status' => false,
                'message' => 'Budget data not found',
                'budget' => $budget
            ], 404);
        } 
        return response()->json([
            'status' => true,
            'message' => 'Budget data found',
            'budget' => $budget
        ]);
    }

    public function update(Request $request, $id){

        $budget = Budget::find($id);
    
        //validate the user's income
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string',
            'amount' => 'required|integer',
        ]);
        
        if ($validator->fails()) {
            return response()->json([ 'status' => false, 'message' => 'Validation error','error' => $validator->errors()], 400);
        }
        
        $budgetStatus = $budget->update([
            'category_name' => $request->category_name,
            'amount' =>$request->amount,
            'user_id' => $request->user_id
        ]);
        //Update the expense as well that is associted with the category
        $updateExpenseStatus = $this->updateExpenses($request->user_id, $id, $request->amount);

        if($budgetStatus && $updateExpenseStatus){
            return response()->json([
                'status' => true,
                'message' => 'Budget data successfully updated!',
                'budget' => Budget::find($id)
            ]); 
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
       


    }

    public function destroy($id){
        $budget = Budget::find($id);

        if(empty($budget)){
            return response()->json([
                'status' => false,
                'message' => 'Category data not found',
                'data' => $budget
            ], 404);  
        }else{
            $budget->delete();

            return response()->json([
                'status' => true,
                'message' => 'Category successfully deleted',
            ], 200); 
        }
    }

    private function updateExpenses($userId, $categoryId, $budgetAmount){
        $expense = Expense::where('user_id', $userId)->where('budget_id', $categoryId)->first();
        
        if(!empty($expense)){
            $expenseAmount = $expense['amount'];
            if($budgetAmount > $expenseAmount){
                $updateExpenseStatus = 1;
            }elseif($budgetAmount == $expenseAmount){
                $updateExpenseStatus = 2;
            }else{
                $updateExpenseStatus = 3; 
            }
    
            $expenseStatus = $expense->update([
                'status' => $updateExpenseStatus
            ]);
    
            if($expenseStatus){
                return true;
            }else{
                return false;
            }
        }

        return true;
       


    }
}
