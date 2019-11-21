<?php

/*
 * This file is part of the FusionCMS application.
 *
 * (c) efelle creative <appdev@efelle.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tests\Feature;

use Tests\Foundation\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DispatcherTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function as_an_authorized_user_the_dispatcher_should_resolve_requests_appropriately()
    {
        $this->actingAs($this->admin, 'api');

        $response = fusion()->get('users/1');

        $this->assertNotNull($response);
        $this->assertEquals($response->data->name, 'Jane Doe');
    }

    /** @test */
    public function as_an_unauthorized_guest_the_dispatcher_should_resolve_requests_when_explicitly_authorized()
    {
        $response = fusion()->authorize()->get('users/1');

        $this->assertNotNull($response);
        $this->assertEquals($response->data->name, 'Jane Doe');
    }
}
