<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IndividualControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $response = $this->get('/api/individual?post_id='.$post->post_id.'&user_id='.$user->id);
        $response->assertStatus(200);
    }
}
