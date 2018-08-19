<?php

namespace TinyIB\Controller;

use GuzzleHttp\Psr7\Response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TinyIB\Service\RendererServiceInterface;
use TinyIB\Service\UserServiceInterface;
use TinyIB\ValidationException;

class AuthController implements AuthControllerInterface
{
    /** @var \TinyIB\Service\RendererServiceInterface $renderer */
    protected $renderer;

    /** @var \TinyIB\Service\UserServiceInterface $user_service */
    protected $user_service;

    /**
     * Creates a new AuthController instance.
     *
     * @param UserServiceInterface $service
     */
    public function __construct(
        RendererServiceInterface $renderer,
        UserServiceInterface $user_service
    ) {
        $this->renderer = $renderer;
        $this->user_service = $user_service;
    }

    /**
     * {@inheritDoc}
     */
    public function registerForm(ServerRequestInterface $request) : ResponseInterface
    {
        /** @var \TinyIB\Model\UserInterface $user */
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

        $content = $this->renderer->render('auth/register.twig', [
            'error' => $error,
            'email' => $email,
        ]);

        return new Response(200, [], $content);
    }

    /**
     * {@inheritDoc}
     */
    public function register(ServerRequestInterface $request) : ResponseInterface
    {
        /** @var \TinyIB\Model\UserInterface $user */
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
        if (isset($_SESSION['tinyibcaptcha'])) {
            $captcha = isset($data['captcha']) ? $data['captcha'] : '';
            if ($captcha !== $_SESSION['tinyibcaptcha']) {
                $_SESSION['error'] = 'Incorrect CAPTCHA';
                return new Response(302, ['Location' => '/' . TINYIB_BOARD . '/auth/register']);
            }
        }

        try {
            $this->user_service->register($email, $password);
            $this->user_service->login($email, $password);
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
    public function loginForm(ServerRequestInterface $request) : ResponseInterface
    {
        /** @var \TinyIB\Model\UserInterface $user */
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

        $content = $this->renderer->render('auth/login.twig', [
            'error' => $error,
            'email' => $email,
        ]);

        return new Response(200, [], $content);
    }

    /**
     * {@inheritDoc}
     */
    public function login(ServerRequestInterface $request) : ResponseInterface
    {
        /** @var \TinyIB\Model\UserInterface $user */
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
        if (isset($_SESSION['tinyibcaptcha'])) {
            $captcha = isset($data['captcha']) ? $data['captcha'] : '';
            if ($captcha !== $_SESSION['tinyibcaptcha']) {
                $_SESSION['error'] = 'Incorrect CAPTCHA';
                return new Response(302, ['Location' => '/' . TINYIB_BOARD . '/auth/login']);
            }
        }

        try {
            $this->user_service->login($email, $password);
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
    public function logout(ServerRequestInterface $request) : ResponseInterface
    {
        $this->user_service->logout();

        // Redirect to the index page.
        return new Response(302, ['Location' => '/' . TINYIB_BOARD]);
    }
}
