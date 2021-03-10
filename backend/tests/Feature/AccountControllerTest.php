<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AccountControllerTest extends TestCase
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
    public function testIndex()
    {
        $response = $this->get('/api/account/{$this->user->id}', [$this->user->id] );
        $response->assertStatus(200);
    }
    public function testUpdate()
    {
        $response = $this->post('/api/account/{$this->user->id}',[
            'id' => $this->user->id,
            'email' => $this->user->email,
            'password' => '1234567890'
        ]);
        $response->assertStatus(200);
    }
    public function testUpdateValidate()
    {
        $response = $this->post('/api/account/{$this->user->id}',[
            'id' => $this->user->id,
            'email' => $this->user->email,
            'password' => ''
        ]);
        $response->assertStatus(302);
    }

}
