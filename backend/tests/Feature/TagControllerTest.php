<?php

namespace Tests\Feature;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TagControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/api/tagList');
        $response->assertStatus(200);
    }
    public function testSearch()
    {   
        $tag = Tag::factory()->create();
        $response = $this->get('/api/tag?tag_id='.$tag->tag_id);
        $response->assertStatus(200);
    }
}
