<?php

namespace Imageboard\Middleware;

use GuzzleHttp\Psr7\Response;
use Imageboard\Model\{CurrentUserInterface, User};
use Imageboard\Service\RendererServiceInterface;
use Psr\Http\Message\{ServerRequestInterface, ResponseInterface};
use Psr\Http\Server\{MiddlewareInterface, RequestHandlerInterface};
use VVatashi\DI\Container;

/**
 * Auth middleware.
 *
 * Sets user attribute on a request.
 */
class AuthMiddleware implements MiddlewareInterface
{
  /** @var RendererServiceInterface */
  protected $container;

  /** @var RendererServiceInterface */
  protected $renderer;

  public function __construct(
    Container $container,
    RendererServiceInterface $renderer
  ) {
    $this->container = $container;
    $this->renderer = $renderer;
  }

  /**
   * {@inheritDoc}
   */
  public function process(
    ServerRequestInterface $request,
    RequestHandlerInterface $handler
  ): ResponseInterface {
    if (isset($_SESSION['user'])) {
      // Try to load user.
      $user = User::find($_SESSION['user']);
    }

    // If there is no user ID in the session,
    // store anonymous user instance in the request.
    if (!isset($user)) {
      $user = User::anonymous();
    }

    // Store current user to a Twig global variable.
    $this->renderer->registerGlobal('user', $user);

    // Store current user to a container.
    $this->container->registerInstance(CurrentUserInterface::class, $user);

    // Store current user to the request object.
    $request = $request->withAttribute('user', $user);

    // Disallow anonymous user acceess.
    if ($user->role === 0) {
      $path = $request->getUri()->getPath();
      if (!preg_match('#^/' . TINYIB_BOARD . '/(auth|captcha)#', $path)) {
        return new Response(302, ['Location' => '/' . TINYIB_BOARD . '/auth/login']);
      }
    }

    return $handler->handle($request);
  }
}