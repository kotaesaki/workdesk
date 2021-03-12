<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentControllerTest extends TestCase
{
    use WithFaker;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function setUp() :void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->post = Post::factory()->create([
            'user_id' => $this->user->id
        ]);
    }
    public function testIndex()
    {
        $response = $this->get('/api/comment', [$this->post->post_id]);
        $response->assertStatus(200);
    }
    public function testStore()
    {
        $user = User::factory()->create();
        $response = $this->post('/api/comment',[
            'comment'=> $this->faker->realText(),
            'post_id' => $this->post->post_id,
            'user_id'=>$this->user->id
        ]);
        $response->assertStatus(200);
    }
    public function testStoreValidate()
    {
        $user = User::factory()->create();
        $response = $this->post('/api/comment',[
            'comment'=> '',
            'post_id' => $this->post->post_id,
            'user_id'=>$this->user->id
        ]);
        $response->assertStatus(302);
    }
    
}
