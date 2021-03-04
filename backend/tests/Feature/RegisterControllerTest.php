<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterControllerTest extends TestCase
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
        
    }

    public function testRegister()
    {
        $password =$this->faker->password;
        $data = [
            'name'=> $this->faker->name,
            'login_id' => $this->faker->unique()->userName,
            'email' => $this->faker->unique()->email,
            'password' => $password,
            'password_confirmation' => $password
        ];
        $response = $this->withHeaders([
            'Authorization'=> 'Bearer null',
            'xsrfHeaderName'=> 'X-XSRF-TOKEN',
            'withCredentials'=> true
        ])->post('/api/register', $data);
        $response->assertStatus(200);
    }

    public function testRegisterValidate()
    {
        $response = $this->withHeaders([
            'Authorization'=> 'Bearer null',
            'xsrfHeaderName'=> 'X-XSRF-TOKEN',
            'withCredentials'=> true
        ])->post('/api/register', []);
        $response->assertStatus(302);
    }
}
