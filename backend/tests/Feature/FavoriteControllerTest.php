<?php

namespace Tests\Feature;

use App\Models\Favorite;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FavoriteControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetMylikes()
    {
        $user = User::factory()->create();
        $response = $this->get('/api/mylikes', [$user->id]);
        $response->assertStatus(200);
    }
    public function testStore()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $response = $this->post('/api/favorite',['post_id'=>$post->post_id,'user_id'=>$user->id]);
        $response->assertStatus(200);
    }
    public function testDelete()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $favorite = Favorite::factory()->create([
            'post_id' => $post->post_id,
            'user_id' => $user->id
        ]);
        $data = [
            'post_id'=>$post->post_id,
            'user_id'=>$user->id
        ];
        $response = $this->delete('/api/favorite',$data);
        $response->assertStatus(200);
    }

}
