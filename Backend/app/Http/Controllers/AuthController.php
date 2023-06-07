<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Log;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'nama_user' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:5',
            'confirmation_password' => 'required|same:password'
        ]);

        if($validator->fails()) {
            return messageError($validator->messages()->toArray());
        }

        $user = $validator->validated();

        User::create($user);

        $payload = [
            'nama_user' => $user['nama_user'],
            'role' => 'user',
            'iat' => now()->timestamp,
            'exp' => now()->timestamp + 7200

        ];

        $token = JWT::encode($payload, env('JWT_SECRET_KEY'), 'HS256');

        Log::create([
            'module' => 'register',
            'action' => 'register akun',
            'useraccess' => $user['email']
        ]);

        return response()->json([
            "data" => [
                'msg' => 'berhasil register',
                'nama' => $user['nama_user'],
                'email' => $user['email'],
                'role' => 'user',
                'statusCode' => 200,
            ],
            "token" => "{$token}"
        ], 200);

        return response()->json([

            "msg"=> "Error",
            'statusCode'=> 422
         ], 422);
    }

    public function login(Request $request){

        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return messageError($validator->messages()->toArray());
        }

        if (Auth::attempt($validator->validated())){
            $payload = [
                'id' => Auth::user()->idm_user,
                'nama' => Auth::user()->nama_user,
                'role' => Auth::user()->role,
                'iat' => now()->timestamp,
                'exp' => now()->timestamp + 7200
            ];

            $token = JWT::encode($payload,env('JWT_SECRET_KEY'),'HS256');

            Log::create([
                'module' => 'login',
                'action' => 'login_akun',
                'useraccess' => Auth::user()->email
            ]);

            return response()->json([
                    'msg' => "berhasil login",
                    'id' => Auth::user()->idm_user,
                    'nama' => Auth::user()->nama_user,
                    'email' => Auth::user()->email,
                    'statusCode' => 200,
                    'role' => Auth::user()->role,
                "token" => "Bearer {$token}"
            ],200);
        }
        
        return response()->json([

           "msg"=> "email atau password salah",
           'statusCode'=> 422
        ], 422);
        
    }
}
