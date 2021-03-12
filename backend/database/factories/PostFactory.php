<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => 10,
            'description' => $this->faker->realText(),
            'photo_name' => 'no-image.jpg',
            'photo_path' => 'storage/no-image.jpg',

        ];
    }
}
