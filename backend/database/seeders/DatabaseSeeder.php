<?php

namespace Database\Seeders;

use App\Models\Favorite;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(1)->create();
        $this->call(ProfileTableSeeder::class);
        $this->call(PostTableSeeder::class);
        $this->call(TagTableSeeder::class);
        $this->call(CommentSeeder::class);
        $this->call(FavoriteTableSeeder::class);
    }
}
