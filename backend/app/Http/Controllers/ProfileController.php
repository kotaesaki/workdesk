<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\DB;



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
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:100',
            /* 'image' => 'required|file|image|mimes:png,jpeg|max:1024', */
        ]);

        /*        if (request()->file) {
            $file_name = time() . '.' . request()->file->getClientOriginalName();
            request()->file->storeAs('public', $file_name);

            $image = new Profile();
            $image->icon_path = 'storage/' . $file_name;
            $image->save();

            return ['success' => '登録しました!'];
        }
 */
        try {

            $file_name = request()->file->getClientOriginalName();
            request()->file->storeAs('public', $file_name);
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
                        'icon_path' => 'storage/' . $file_name
                    ]
                );
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
            }
        } catch (\Exception $e) {
        }
    }
}
