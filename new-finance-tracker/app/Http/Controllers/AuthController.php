<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthController extends Controller
{
    public function login(Request $request){

        // dd($request->all());
        //validate the user details
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation failed','error' => $validator->errors()], 200);
        }
  
        $user = $request->only('email', 'password');
        try {
            $token = JWTAuth::attempt($user);
            if(!$token){
                return response()->json([
                    'status' => false,
                    'message' => 'Email or Password is wrong!',
    
                ], 200);
            }
        } catch (JWTException  $e) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create token.',
               ], 500);
        }
        return response()->json([
            'status' => true,
             'token' => $token,
             'user' => $user
        ]);


    }

    public function register(Request $request){

        //validate the user's inputs
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|min:6',
            'cpassword' => 'required|min:6|same:password',
        ], [
            'password.required' => 'Password is required',
            'password.min' => 'Password must have at least 6 characters',
            'cpassword.same' => 'Confirm Password must match with Password',
            'cpassword.required' => 'Confirm Password is required',
            'cpassword.min' => 'Confirm Password must have at least 6 characters',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation failed', 'error' => $validator->errors()], 200);
        }

         $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'age' => isset($request->age) ? $request->age : null,
            'address' => isset($request->address) ? $request->address : null,
         ]);

         $userCredentials = $request->only('email', 'password');
         $token = JWTAuth::attempt($userCredentials);

         return response()->json([
            'status' => true,
            'message' => 'User registration successfully done!',
            'user' => $user,
            'token' => $token,
        ], 200);

    }

    public function logout(Request $request)
    {
  //Request is validated, do logout        
        try {
            JWTAuth::invalidate($request->token);
 
            return response()->json([
                'success' => true,
                'message' => 'User has been logged out'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
