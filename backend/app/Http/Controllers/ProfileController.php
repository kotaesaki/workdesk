<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ProfileRequest;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($login_id)
    {
        $user = User::find($login_id);
        $profile = Profile::where('user_id', $login_id)->first();
        return [$user, $profile];
    }
    public function store(ProfileRequest $request)
    {
        try {
            if(!$request->file){
                $file_name = $request->icon_title;
                $path = $request->icon_path;
            }else{
                $file_name = request()->file->getClientOriginalName();
                if(app()->environment('local')){
                    $disk = Storage::disk('s3')->putFile('/test/profile', request()->file,'public');
                }else if(app()->environment('production')){
                    $disk = Storage::disk('s3')->putFile('/production/profile', request()->file,'public');
                }
                $path = Storage::disk('s3')->url($disk);
            }
            DB::beginTransaction();
            try {
                $user = User::find($request->id);
                $user->name = $request->name;
                $user->save();
                Profile::updateOrCreate(
                    ['user_id' => $request->id],
                    [
                        'website_url' => $request->website_url,
                        'twitter_url' => $request->twitter_url,
                        'shokai' => $request->shokai,
                        'occupation' => $request->occupation,
                        'sex' => $request->sex,
                        'age' => $request->age,
                        'icon_title' => $file_name,
                        'icon_path' => $path
                    ]
                );
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
