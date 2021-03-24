<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AccountRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


class AccountController extends Controller
{
    public function index($login_id)
    {
        $user = User::find($login_id);
        return $user;
    }


    public function update(AccountRequest $request)
    {
        DB::beginTransaction();
        try{
            $user = User::find($request->id);
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();  
            DB::commit();
        }catch(\Exception $e){
            DB::rollBack();
        }
    }
}
