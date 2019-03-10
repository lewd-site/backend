<?php

namespace Imageboard\Controller;

use GuzzleHttp\Psr7\Response;
use Imageboard\Exception\ValidationException;
use Imageboard\Model\User;
use Imageboard\Service\{
    CaptchaServiceInterface,
    RendererServiceInterface
};
use Psr\Http\Message\{ServerRequestInterface, ResponseInterface};

class AuthController implements AuthControllerInterface
{
    /** @var CaptchaService */
    protected $captcha_service;

    /** @var RendererServiceInterface */
    protected $renderer;

    /**
     * Creates a new AuthController instance.
     */
    public function __construct(
        CaptchaServiceInterface $captcha_service,
        RendererServiceInterface $renderer
    ) {
        $this->captcha_service = $captcha_service;
        $this->renderer = $renderer;
    }

    /**
     * {@inheritDoc}
     */
    public function registerForm(ServerRequestInterface $request)
    {
        /** @var User */
        $user = $request->getAttribute('user');
        if (!$user->isAnonymous()) {
            // Allow only anonymous user access.
            // Redirect logged in users to the index page.
            $_SESSION['error'] = 'Already logged in';
            return new Response(302, ['Location' => '/' . TINYIB_BOARD]);
        }

        // Restore form input from the session.
        $error = isset($_SESSION['error']) ? $_SESSION['error'] : '';
        $email = isset($_SESSION['email']) ? $_SESSION['email'] : '';

        unset($_SESSION['error']);
        unset($_SESSION['email']);

        return $this->renderer->render('auth/register.twig', [
            'error' => $error,
            'email' => $email,
        ]);
    }

    /**
     * {@inheritDoc}
     */
    public function register(ServerRequestInterface $request) : ResponseInterface
    {
        /** @var User */
        $user = $request->getAttribute('user');
        if (!$user->isAnonymous()) {
            // Allow only anonymous user access.
            // Redirect logged in users to the index page.
            $_SESSION['error'] = 'Already logged in';
            return new Response(302, ['Location' => '/' . TINYIB_BOARD]);
        }

        $data = $request->getParsedBody();
        $email = isset($data['email']) ? $data['email'] : '';
        $password = isset($data['password']) ? $data['password'] : '';

        // Store form input to the session.
        $_SESSION['email'] = $email;

        // Check captcha.
        $captcha = isset($data['captcha']) ? $data['captcha'] : '';
        if (!$this->captcha_service->checkCaptcha($captcha)) {
            $_SESSION['error'] = 'Incorrect CAPTCHA';
            return new Response(302, ['Location' => '/' . TINYIB_BOARD . '/auth/register']);
        }

        try {
            User::createUser($email, $password);
            // Do not automatically login user after registration.
            //User::login($email, $password);
        }
        catch(ValidationException $e) {
            $_SESSION['error'] = $e->getMessage();
            return new Response(302, ['Location' => '/' . TINYIB_BOARD . '/auth/register']);
        }

        // Redirect to the index page.
        return new Response(302, ['Location' => '/' . TINYIB_BOARD]);
    }

    /**
     * {@inheritDoc}
     */
    public function loginForm(ServerRequestInterface $request)
    {
        /** @var User */
        $user = $request->getAttribute('user');
        if (!$user->isAnonymous()) {
            // Allow only anonymous user access.
            // Redirect logged in users to the index page.
            $_SESSION['error'] = 'Already logged in';
            return new Response(302, ['Location' => '/' . TINYIB_BOARD]);
        }

        // Restore form input from the session.
        $error = isset($_SESSION['error']) ? $_SESSION['error'] : '';
        $email = isset($_SESSION['email']) ? $_SESSION['email'] : '';

        unset($_SESSION['error']);
        unset($_SESSION['email']);

        return $this->renderer->render('auth/login.twig', [
            'error' => $error,
            'email' => $email,
        ]);
    }

    /**
     * {@inheritDoc}
     */
    public function login(ServerRequestInterface $request) : ResponseInterface
    {
        /** @var User */
        $user = $request->getAttribute('user');
        if (!$user->isAnonymous()) {
            // Allow only anonymous user access.
            // Redirect logged in users to the index page.
            $_SESSION['error'] = 'Already logged in';
            return new Response(302, ['Location' => '/' . TINYIB_BOARD]);
        }

        $data = $request->getParsedBody();
        $email = isset($data['email']) ? $data['email'] : '';
        $password = isset($data['password']) ? $data['password'] : '';

        // Store form input to the session.
        $_SESSION['email'] = $email;

        // Check captcha.
        $captcha = isset($data['captcha']) ? $data['captcha'] : '';
        if (!$this->captcha_service->checkCaptcha($captcha)) {
            $_SESSION['error'] = 'Incorrect CAPTCHA';
            return new Response(302, ['Location' => '/' . TINYIB_BOARD . '/auth/login']);
        }

        try {
            User::login($email, $password);
        }
        catch(ValidationException $e) {
            $_SESSION['error'] = $e->getMessage();
            return new Response(302, ['Location' => '/' . TINYIB_BOARD . '/auth/login']);
        }

        // Redirect to the index page.
        return new Response(302, ['Location' => '/' . TINYIB_BOARD]);
    }

    /**
     * {@inheritDoc}
     */
    public function logout() : ResponseInterface
    {
        User::logout();

        // Redirect to the index page.
        return new Response(302, ['Location' => '/' . TINYIB_BOARD]);
    }
}