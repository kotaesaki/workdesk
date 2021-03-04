<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MypageControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetId()
    {
        $user = User::factory()->create();
        $profile = Profile::factory()->create([
            'user_id' => $user->id
        ]);
        $response = $this->get('/api/getId/'.$user->id);
        $response->assertStatus(200);
    }
    public function testGetPost()
    {
        $user = User::factory()->create();
        $response = $this->get('/api/getPost?page=1',[$user->id]);
        $response->assertStatus(200); 
    }
}
 