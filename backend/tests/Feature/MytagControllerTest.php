<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MytagControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetMytag()
    {
        $user = User::factory()->create();
        $response = $this->get('/api/mytag/'.$user->id.'?user_id='.$user->id);
        $response->assertStatus(200);
    }
}
