<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

class ProfileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Profile::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'website_url' => $this->faker->url,
            'twitter_url' => $this->faker->url,
            'shokai' => $this->faker->realText(),
            'occupation' => 'エンジニア',
            'age' => $this->faker->dayOfMonth(),
            'sex' => '男性',
            'icon_title' => 'aiue.png',
            'icon_path' => 'https://takuwaku-s3.s3.ap-northeast-1.amazonaws.com/test/profile/HageluUeGbmS19y9GHQkZt6wd2jRnrETP1HnZ9E1.jpg'
        ];
    }
}
