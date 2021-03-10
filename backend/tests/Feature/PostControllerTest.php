<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\Profile;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Testing\FileFactory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use WithFaker;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $user = User::factory()
            ->has(Profile::factory()->count(1))        
            ->create();
        $response = $this->get('/api/post_upload/'.$user->id);
        $response->assertStatus(200);
    }
    public function testStore()
    {
        Storage::fake('s3');
        $dummyFile = UploadedFile::fake()->image('fake.png');
        $user = User::factory()->create();
        $post = [
            'id' => $user->id,
            'description' => $this->faker->realText(),
            'file' => $dummyFile,
            'tag' => [
                $this->faker->word()
            ]
        ];
        $response = $this->withHeaders([
            'content-type'=> 'multipart/form-data'
        ])->post('/api/post_upload/'.$user->id, $post);
        $dummyFile->storeAs('', 'fake.png', ['disk'=>'s3']);
        $response->assertStatus(200);
        Storage::disk('s3')->assertExists('fake.png');
    }

}
