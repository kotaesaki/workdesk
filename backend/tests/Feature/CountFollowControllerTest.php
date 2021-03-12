<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CountFollowControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCount()
    {
        $user = User::factory()->create();
        $response = $this->get('/api/countFollow?user_id='.$user->id);
        $response->assertStatus(200);
    }
}
