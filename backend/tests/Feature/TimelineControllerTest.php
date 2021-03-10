<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TimelineControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/api/timeline');
        $response->assertStatus(200);
    }
/*     public function testGetTrend()
    {
        $response = $this->get('/api/trend_timeline');
        $response->assertStatus(200);
    } */
}
