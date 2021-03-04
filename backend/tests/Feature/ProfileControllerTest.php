<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Profile;

class ProfileControllerTest extends TestCase
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
        $this->user = User::factory()->has(Profile::factory())->create();
    }
    public function testIndex()
    {
        $response = $this->get('/api/profile/{$this->user->id}', [$this->user->id]);
        $response->assertStatus(200);
    }
}
