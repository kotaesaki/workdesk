<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FavoriteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Favorite::factory(1)->create();
    }
}
