<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_task_index_page(): void
    {
        $response = $this->get('/tasks');

        $response->assertOk();
    }

    public function test_user_can_create_a_task(): void
    {
        $response = $this->post('/tasks', [
            'title' => 'Write project summary',
            'description' => 'Ship the task manager feature',
            'status' => 'pending',
        ]);

        $response->assertRedirect('/tasks');
        $this->assertDatabaseHas('tasks', [
            'title' => 'Write project summary',
            'status' => 'pending',
        ]);
    }
}
