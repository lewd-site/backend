<?php

namespace TinyIB\Service;

use FastRoute\{Dispatcher, RouteCollector};

use Psr\Container\ContainerInterface;
use Psr\Http\Message\{ResponseInterface, ServerRequestInterface};
use Psr\Http\Server\RequestHandlerInterface;

use TinyIB\Controller\{
    AuthControllerInterface,
    CaptchaControllerInterface,
    PostControllerInterface,
    SettingsControllerInterface
};
use TinyIB\Controller\Admin\{
    BansControllerInterface,
    DashboardControllerInterface,
    ModLogControllerInterface,
    PostsControllerInterface,
    UserCrudControllerInterface
};
use TinyIB\Controller\Amp\AmpPostControllerInterface;
use TinyIB\Controller\Mobile\MobilePostControllerInterface;
use TinyIB\NotFoundException;

class RoutingService implements RoutingServiceInterface, RequestHandlerInterface
{
    /** @var ContainerInterface $container */
    protected $container;

    /** @var Dispatcher $dispatcher */
    protected $dispatcher;

    /**
     * Creates a new RoutingService instance.
     */
    public function __construct(
        ContainerInterface $container
    ) {
        $this->container = $container;

        $this->dispatcher = \FastRoute\simpleDispatcher(function (RouteCollector $routes) {
            $routes->addGroup('/auth', function (RouteCollector $routes) {
                $routes->addRoute('GET',  '/register', [AuthControllerInterface::class, 'registerForm']);
                $routes->addRoute('POST', '/register', [AuthControllerInterface::class, 'register']);
                $routes->addRoute('GET',  '/login',    [AuthControllerInterface::class, 'loginForm']);
                $routes->addRoute('POST', '/login',    [AuthControllerInterface::class, 'login']);
                $routes->addRoute('GET',  '/logout',   [AuthControllerInterface::class, 'logout']);
            });

            $routes->addGroup('/admin', function (RouteCollector $routes) {
                $routes->addRoute('GET',  '', [DashboardControllerInterface::class, 'index']);

                $routes->addGroup('/bans', function (RouteCollector $routes) {
                    $routes->addRoute('GET',  '',        [BansControllerInterface::class, 'list']);
                    $routes->addRoute('GET',  '/create', [BansControllerInterface::class, 'createForm']);
                    $routes->addRoute('POST', '/create', [BansControllerInterface::class, 'create']);
                    $routes->addRoute('POST', '/delete', [BansControllerInterface::class, 'delete']);
                });

                $routes->addGroup('/modlog', function (RouteCollector $routes) {
                    $routes->addRoute('GET',  '', [ModLogControllerInterface::class, 'list']);
                });

                $routes->addGroup('/posts', function (RouteCollector $routes) {
                    $routes->addRoute('GET',   '',                 [PostsControllerInterface::class, 'list']);
                    $routes->addRoute('GET',   '/{id:\d+}',        [PostsControllerInterface::class, 'show']);
                    $routes->addRoute('POST',  '/{id:\d+}/delete', [PostsControllerInterface::class, 'delete']);
                });

                $routes->addGroup('/user', function (RouteCollector $routes) {
                    $routes->addRoute('GET',  '',                        [UserCrudControllerInterface::class, 'list']);
                    $routes->addRoute('GET',  '/create',                 [UserCrudControllerInterface::class, 'createForm']);
                    $routes->addRoute('POST', '/create/submit',          [UserCrudControllerInterface::class, 'create']);
                    $routes->addRoute('GET',  '/{id:\d+}',               [UserCrudControllerInterface::class, 'show']);
                    $routes->addRoute('GET',  '/{id:\d+}/edit',          [UserCrudControllerInterface::class, 'editForm']);
                    $routes->addRoute('POST', '/{id:\d+}/edit/submit',   [UserCrudControllerInterface::class, 'edit']);
                    $routes->addRoute('GET',  '/{id:\d+}/delete',        [UserCrudControllerInterface::class, 'deleteConfirm']);
                    $routes->addRoute('POST', '/{id:\d+}/delete/submit', [UserCrudControllerInterface::class, 'delete']);
                });
            });

            $routes->addGroup('/ajax', function (RouteCollector $routes) {
                $routes->addGroup('/mobile', function (RouteCollector $routes) {
                    $routes->addRoute('GET',  '/thread/{id:\d+}', [MobilePostControllerInterface::class, 'ajaxThread']);
                    $routes->addRoute('POST', '/post/create',     [MobilePostControllerInterface::class, 'ajaxCreatePost']);
                });

                $routes->addRoute('POST', '/post/create',  [PostControllerInterface::class, 'ajaxCreatePost']);
            });

            $routes->addGroup('/amp', function (RouteCollector $routes) {
                $routes->addRoute('GET', '',                 [AmpPostControllerInterface::class, 'index']);
                $routes->addRoute('GET', '/thread/{id:\d+}', [AmpPostControllerInterface::class, 'thread']);
            });

            $routes->addGroup('/mobile', function (RouteCollector $routes) {
                $routes->addRoute('GET',  '',                 [MobilePostControllerInterface::class, 'index']);
                $routes->addRoute('GET',  '/thread/{id:\d+}', [MobilePostControllerInterface::class, 'thread']);
                $routes->addRoute('POST', '/post/create',     [MobilePostControllerInterface::class, 'createPost']);
            });

            $routes->addRoute('GET', '/captcha',  [CaptchaControllerInterface::class,  'captcha']);
            $routes->addRoute('GET', '/settings', [SettingsControllerInterface::class, 'settings']);

            $routes->addRoute('GET',  '/',             [PostControllerInterface::class, 'board']);
            $routes->addRoute('GET',  '/{page:\d+}',   [PostControllerInterface::class, 'board']);
            $routes->addRoute('GET',  '/res/{id:\d+}', [PostControllerInterface::class, 'thread']);
            $routes->addRoute('POST', '/post/create',  [PostControllerInterface::class, 'create']);
            $routes->addRoute('POST', '/post/delete',  [PostControllerInterface::class, 'delete']);
        });
    }

    /**
     * {@inheritDoc}
     */
    public function handle(ServerRequestInterface $request) : ResponseInterface
    {
        $uri = $request->getUri();
        $method = $request->getMethod();
        $path = $uri->getPath();

        // Remove board prefix.
        $prefix = '/' . TINYIB_BOARD . '/';
        $prefix_length = strlen($prefix);
        if (strncmp($path, $prefix, $prefix_length) === 0) {
            $path = substr($path, $prefix_length);
        }

        // Remove query params.
        $path = strtok($path, '?#');

        // Remove html extension.
        if (substr($path, -5) === '.html') {
            $path = substr($path, 0, -5);
        }

        // Remove trailing slash.
        if (substr($path, -1) === '/') {
            $path = substr($path, 0, -1);
        }

        $path = '/' . $path;
        $uri = $uri->withPath($path);
        $request = $request->withUri($uri);
        $this->container->registerInstance(ServerRequestInterface::class, $request);

        $result = $this->dispatcher->dispatch($method, $path);
        switch ($result[0]) {
            default:
            case Dispatcher::NOT_FOUND:
            case Dispatcher::METHOD_NOT_ALLOWED:
                throw new NotFoundException();

            case Dispatcher::FOUND:
                $handler = $result[1];
                $args = $result[2];

                [$controller_id, $action] = $handler;

                $controller = $this->container->get($controller_id);
                $args = $this->container->getParameters([$controller, $action]);
                return $controller->$action(...$args);
        }
    }
}
