<?php

namespace TinyIB\Tests\Unit;

use GuzzleHttp\Psr7\ServerRequest;
use PHPUnit\Framework\TestCase;
use TinyIB\{AccessDeniedException, NotFoundException};
use TinyIB\Commands\CommandDispatcher;
use TinyIB\Controller\Admin\PostsController;
use TinyIB\Model\{Post, User};
use TinyIB\Queries\{QueryDispatcher, ListPosts, ListPostsHandler};
use TinyIB\Tests\Mock\RendererServiceMock;

final class AdminPostsControllerTest extends TestCase
{
    const USER_ROLE = 1;
    const ADMIN_ROLE = 3;

    /** @var PostsControllerInterface $controller */
    protected $controller;

    public function setUp() : void
    {
        global $container;

        Post::truncate();

        $command_dispatcher = new CommandDispatcher($container);
        $query_dispatcher = new QueryDispatcher($container);
        $renderer = new RendererServiceMock();
        $this->controller = new PostsController(
            $command_dispatcher,
            $query_dispatcher,
            $renderer
        );
    }

    public function test_list_notAdmin_shouldThrowException() : void
    {
        $this->expectException(AccessDeniedException::class);

        $user = new User(['role' => static::USER_ROLE]);
        $request = new ServerRequest('GET', '/admin/posts');
        $request = $request->withAttribute('user', $user);
        $this->controller->list($request);
    }

    public function test_list_admin_shouldReturnStatus200() : void
    {
        $user = new User(['role' => static::ADMIN_ROLE]);
        $request = new ServerRequest('GET', '/admin/posts');
        $request = $request->withAttribute('user', $user);
        $response = $this->controller->list($request);
        $status = $response->getStatusCode();
        $this->assertEquals(200, $status);
    }

    public function test_show_notAdmin_shouldThrowException() : void
    {
        $this->expectException(AccessDeniedException::class);

        $user = new User(['role' => static::USER_ROLE]);
        $request = new ServerRequest('GET', '/admin/posts/1');
        $request = $request->withAttribute('user', $user);
        $this->controller->show($request);
    }

    public function test_show_notFound_shouldThrowException() : void
    {
        $this->expectException(NotFoundException::class);

        $user = new User(['role' => static::ADMIN_ROLE]);
        $request = new ServerRequest('GET', '/admin/posts/1');
        $request = $request->withAttribute('user', $user);
        $this->controller->show($request);
    }

    public function test_show_shouldReturnStatus200() : void
    {
        $id = 1;
        Post::create([
            'id' => $id,
            'ip' => '',
            'name' => '',
            'tripcode' => '',
            'email' => '',
            'subject' => '',
            'message' => '',
            'password' => '',
        ]);

        $user = new User(['role' => static::ADMIN_ROLE]);
        $request = new ServerRequest('GET', "/admin/posts/$id");
        $request = $request->withAttribute('user', $user);
        $response = $this->controller->show($request);
        $status = $response->getStatusCode();
        $this->assertEquals(200, $status);
    }

    public function test_delete_notAdmin_shouldThrowException() : void
    {
        $this->expectException(AccessDeniedException::class);

        $user = new User(['role' => static::USER_ROLE]);
        $request = new ServerRequest('GET', '/admin/posts/1/delete');
        $request = $request->withAttribute('user', $user);
        $this->controller->delete($request);
    }

    public function test_delete_notFound_shouldThrowException() : void
    {
        $this->expectException(NotFoundException::class);

        $user = new User(['role' => static::ADMIN_ROLE]);
        $request = new ServerRequest('GET', '/admin/posts/1/delete');
        $request = $request->withAttribute('user', $user);
        $this->controller->delete($request);
    }

    public function test_delete_shouldReturnStatus302() : void
    {
        $id = 1;
        Post::create([
            'id' => $id,
            'ip' => '',
            'name' => '',
            'tripcode' => '',
            'email' => '',
            'subject' => '',
            'message' => '',
            'password' => '',
        ]);

        $user = new User(['role' => static::ADMIN_ROLE]);
        $request = new ServerRequest('GET', "/admin/posts/$id/delete");
        $request = $request->withAttribute('user', $user);
        $response = $this->controller->delete($request);
        $status = $response->getStatusCode();
        $this->assertEquals(302, $status);
    }
}
