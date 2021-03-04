<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class LoginControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function setUp() :void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }
    public function testLogin()
    {   
        $response = $this->post('/api/login', [
            'login_id' => $this->user->login_id,
            'password' => '1234567890'
        ]);
        $response->assertStatus(200);
    }
    public function testLoginValidate()
    {
        $response = $this->post('/api/login', [
            'login_id' => '',
            'password' => ''
        ]);
        $response->assertStatus(302);
    }
    public function testLogout()
    {
        $data = [
            'login_id'=> $this->user->login_id
        ];
        $response = $this->post('/api/logout', $data);
        $response->assertStatus(200);
    }
}
