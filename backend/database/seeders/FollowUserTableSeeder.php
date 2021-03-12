<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FollowUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\FollowUser::factory(1)->create();
        
    }
}
