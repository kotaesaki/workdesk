<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:100',
            'file' => 'nullable|mimes:png,jpeg|max:1024',
            'website_url' => 'nullable',
            'twitter_url' => 'nullable',
            'shokai' => 'nullable|max:1000',
            'occupation' => 'nullable|max:10',
            'sex' => 'nullable|max:10',
            'age' => 'nullable|max:10'
        ];
    }
    public function attributes()
    {
        return[
            'name' =>'ニックネーム',
            'file' => 'アイコン',
            'website_url' => 'ウェブサイト',
            'twitter_url' => 'Twitter',
            'shokai' => '紹介文',
            'occupation' => '職業',
            'sex' => '性別',
            'age' => '年齢'
        ];
    }
}
