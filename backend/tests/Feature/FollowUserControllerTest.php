<?php

namespace Tests\Feature;

use App\Models\FollowUser;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FollowUserControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testFollow()
    {
        $authuser = User::factory()->create();
        $postuser = User::factory()->create();
        $response = $this->post('/api/follow', [
            'auth_user' => $authuser->id,
            'post_user' => $postuser->id
        ]);
        $response->assertStatus(200);
        $response = $this->delete('/api/follow', [
            'auth_user' => $authuser->id,
            'post_user' => $postuser->id
        ]);
        $response->assertStatus(200);
    }
    public function testCheckFollow()
    {
        $authuser = User::factory()->create();
        $postuser = User::factory()->create();
        FollowUser::factory()->create([
            'followed_user_id' => $authuser->id,
            'following_user_id' => $postuser->id
        ]);
        $response = $this->get('/api/follow?auth_user='.$authuser.'&post_user='.$postuser->id);
        $response
            ->assertStatus(200);
    }
    public function testShowFollow()
    {
        $user = User::factory()->create();
        $response = $this->get('/api/follow/'.$user->id.'?user_id='.$user->id,['user_id' => $user->id]);
        $response->assertStatus(200);
    }
    public function testShowFollower()
    {
        $user = User::factory()->create();
        $response = $this->get('/api/follower/'.$user->id.'?user_id='.$user->id,['user_id' => $user->id]);
        $response->assertStatus(200);
    }


}
