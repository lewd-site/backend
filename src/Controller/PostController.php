<?php

namespace TinyIB\Controller;

use GuzzleHttp\Psr7\Response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TinyIB\Cache\CacheInterface;
use TinyIB\Functions;
use TinyIB\Model\Post;
use TinyIB\Service\CaptchaServiceInterface;
use TinyIB\Service\PostServiceInterface;
use TinyIB\Service\RendererServiceInterface;
use TinyIB\ValidationException;

class PostController implements PostControllerInterface
{
    /** @var CacheInterface $cache */
    protected $cache;

    /** @var CaptchaServiceInterface $captcha_service */
    protected $captcha_service;

    /** @var PostServiceInterface $post_service */
    protected $post_service;

    /** @var RendererServiceInterface $renderer */
    protected $renderer;

    /**
     * Constructs new post controller.
     *
     * @param CacheInterface $cache
     * @param CaptchaServiceInterface $captcha_service
     * @param PostServiceInterface $post_service
     * @param RendererServiceInterface $renderer
     */
    public function __construct(
        CacheInterface $cache,
        CaptchaServiceInterface $captcha_service,
        PostServiceInterface $post_service,
        RendererServiceInterface $renderer
    ) {
        $this->cache = $cache;
        $this->captcha_service = $captcha_service;
        $this->post_service = $post_service;
        $this->renderer = $renderer;
    }

    /**
     * Checks captcha.
     *
     * @param string $captcha
     *
     * @return bool
     */
    protected function checkCAPTCHA(string $captcha) : bool
    {
        if (!defined('TINYIB_CAPTCHA') || empty(TINYIB_CAPTCHA)) {
            return true;
        }

        switch (TINYIB_CAPTCHA) {
            case 'simple':
                return $this->captcha_service->checkCaptcha($captcha);

            case 'recaptcha':
                return $this->captcha_service->checkRecaptcha($captcha);

            default:
                return true;
        }
    }

    /**
     * {@inheritDoc}
     */
    public function create(ServerRequestInterface $request) : ResponseInterface
    {
        if (TINYIB_DBMIGRATE) {
            $message = "Posting is currently disabled.\nPlease try again in a few moments.";
            return new Response(503, [], $message);
        }

        $data = $request->getParsedBody();
        $captcha = isset($data['captcha']) ? $data['captcha'] : '';
        if (!$this->checkCAPTCHA($captcha)) {
            throw new ValidationException('Incorrect CAPTCHA');
        }

        $name = isset($data['name']) ? $data['name'] : '';
        $email = isset($data['email']) ? $data['email'] : '';
        $subject = isset($data['subject']) ? $data['subject'] : '';
        $message = isset($data['message']) ? $data['message'] : '';
        $password = isset($data['password']) ? $data['password'] : '';
        $ip = $_SERVER['REMOTE_ADDR'];
        $user_id = $request->getAttribute('user')->id;
        $parent = isset($data['parent']) ? (int)$data['parent'] : 0;
        $rawpost = isset($data['rawpost']);

        $post = $this->post_service->create(
            $name,
            $email,
            $subject,
            $message,
            $password,
            $ip,
            $user_id,
            $parent,
            $rawpost
        );

        $redirect_url = '/' . TINYIB_BOARD . '/';
        if ($post->isModerated()) {
            if (TINYIB_ALWAYSNOKO || strtolower($post->email) === 'noko') {
                $id = $post->id;
                $thread_id = $post->isThread() ? $id : $post->parent_id;
                $redirect_url = '/' . TINYIB_BOARD . "/res/$thread_id#$id";
            }
        }

        return new Response(302, ['Location' => $redirect_url]);
    }

    /**
     * {@inheritDoc}
     */
    public function delete(ServerRequestInterface $request) : ResponseInterface
    {
        if (TINYIB_DBMIGRATE) {
            $message = "Post deletion is currently disabled.\nPlease try again in a few moments.";
            return new Response(503, [], $message);
        }

        $data = $request->getParsedBody();
        $id = isset($data['delete']) ? $data['delete'] : 0;
        $password = isset($data['password']) ? $data['password'] : '';
        $this->post_service->delete($id, $password);
        return new Response(200, [], 'Post deleted.');
    }

    /**
     * @return string
     */
    protected function supportedFileTypes() : string
    {
        global $tinyib_uploads;
        if (empty($tinyib_uploads)) {
            return '';
        }

        $types_allowed = array_map('strtoupper', array_unique(array_column($tinyib_uploads, 0)));
        $types_last = array_pop($types_allowed);
        $types_formatted = $types_allowed
            ? implode(', ', $types_allowed) . ' and ' . $types_last
            : $types_last;

        return 'Supported file type' . (count($tinyib_uploads) != 1 ? 's are ' : ' is ') . $types_formatted . '.';
    }

    /**
     * @param int $id
     *
     * @return string
     */
    protected function renderThreadPage(int $id) : string
    {
        $posts = Post::getPostsByThreadID($id);
        $post_vms = $posts->map(function ($post) {
            /** @var Post $post */
            return $post->createViewModel(TINYIB_RESPAGE);
        });

        return $this->renderer->render('thread.twig', [
            'filetypes' => $this->supportedFileTypes(),
            'posts' => $post_vms,
            'parent' => $id,
            'res' => TINYIB_RESPAGE,
            'thumbnails' => true,
        ]);
    }

    /**
     * @param int $page
     *
     * @return string
     */
    protected function renderBoardPage(int $page) : string
    {
        $threads = Post::getThreadsByPage($page);
        $threads_count = Post::getThreadCount();
        $pages = ceil($threads_count / TINYIB_THREADSPERPAGE) - 1;
        $post_vms = [];

        foreach ($threads as $thread) {
            $replies = Post::getPostsByThreadID($thread->id);
            $omitted_count = max(0, $replies->count() - TINYIB_PREVIEWREPLIES - 1);
            $replies = $replies->take(-TINYIB_PREVIEWREPLIES);
            if ($replies->count() === 0 || $replies->first()->id !== $thread->id) {
                $replies->prepend($thread);
            }

            $thread_reply_vms = $replies->map(function ($post) use ($omitted_count) {
                /** @var \TinyIB\Models\PostInterface $post */
                return $post->createViewModel(TINYIB_INDEXPAGE);
            });

            $post_vms = collect([$post_vms, $thread_reply_vms])->collapse();
        }

        return $this->renderer->render('board.twig', [
            'filetypes' => $this->supportedFileTypes(),
            'posts' => $post_vms,
            'pages' => max($pages, 0),
            'this_page' => $page,
            'parent' => 0,
            'res' => TINYIB_INDEXPAGE,
            'thumbnails' => true,
        ]);
    }

    /**
     * {@inheritDoc}
     */
    public function board(ServerRequestInterface $request) : ResponseInterface
    {
        $args = explode('/', $request->getUri()->getPath());
        $page = count($args) > 1 ? (int)$args[1] : 0;
        $key = TINYIB_BOARD . ':page:' . $page;
        $data = $this->cache->get($key);
        if (!isset($data)) {
            $data = $this->renderBoardPage($page);
            $this->cache->set($key, $data, 4 * 60 * 60);
        }

        return new Response(200, [], $data);
    }

    /**
     * {@inheritDoc}
     */
    public function thread(ServerRequestInterface $request) : ResponseInterface
    {
        $args = explode('/', $request->getUri()->getPath());
        $id = (int)$args[2];
        $key = TINYIB_BOARD . ':thread:' . $id;
        $data = $this->cache->get($key);
        if (!isset($data)) {
            $data = $this->renderThreadPage($id);
            $this->cache->set($key, $data, 4 * 60 * 60);
        }

        return new Response(200, [], $data);
    }
}
