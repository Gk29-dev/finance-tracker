<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;


class IncomeController extends Controller
{

    public function index(Request $request){
        
        $userId = $request->header('user_id');
        return response()->json([
            'status' => true,
            'message' => 'All incomes of the users',
            'incomes' => Income::where('user_id', $userId)->get()
        ]);
    }

    public function store(Request $request){
    
        //validate the user's income
        $validator = Validator::make($request->all(), [
            'income_date' => 'required|date',
            'source' => 'required|string|unique:incomes',
            'amount' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json([ 'status' => false, 'message' => 'Validation error','error' => $validator->errors()], 400);
        }

        $userIncome = Income::create([
            'income_date' => $request->income_date,
            'source' => $request->source,
            'amount' =>$request->amount,
            'user_id' => $request->user_id
         ]);

         if($userIncome){
            return response()->json([
                'status' => true,
                'message' => 'New Income Successfully Added!',
                'income' => $userIncome,
            ], 200);
         }else{
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!'
            ], 500);
         }
      
    }

    public function edit($id){

        $income = Income::find($id);

        if(empty($income)){
            return response()->json([
                'status' => false,
                'message' => 'Income data not found',
                'income' => $income
            ], 404);
        } 
        return response()->json([
            'status' => true,
            'message' => 'Income data found',
            'income' => $income
        ]);
    }

    public function update(Request $request, $id){
        $income = Income::find($id);
    
        //validate the user's income
        $validator = Validator::make($request->all(), [
            'income_date' => 'required|date',
            'source' => "required|string|unique:incomes,source,$id,id",
            'amount' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json([ 'status' => false, 'message' => 'Validation error','error' => $validator->errors()], 400);
        }
        
        $updateIncomeStatus = $income->update([
            'income_date' => $request->income_date,
            'source' => $request->source,
            'amount' =>$request->amount,
            'user_id' =>  $request->user_id
        ]);

        if($updateIncomeStatus){
            return response()->json([
                'status' => true,
                'message' => 'Income data successfully updated!',
                'income' => Income::find($id)
            ], 200); 
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
                'income' => $income
            ], 500);
        }
       


    }

    public function destroy($id){
        $income = Income::find($id);

        if(empty($income)){
            return response()->json([
                'status' => false,
                'message' => 'Income data not found',
                'data' => $income
            ], 404);  
        }else{
            $income->delete();

            return response()->json([
                'status' => true,
                'message' => 'Income data successfully deleted',
            ], 200); 
        }
    }
}
