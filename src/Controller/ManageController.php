<?php

namespace TinyIB\Controller;

use TinyIB\Cache\CacheInterface;
use TinyIB\Functions;
use TinyIB\Repository\BanRepositoryInterface;
use TinyIB\Repository\PostRepositoryInterface;
use TinyIB\Request;
use TinyIB\Response;
use TinyIB\Model\Ban;
use TinyIB\Model\BanInterface;
use TinyIB\Service\BanServiceInterface;
use TinyIB\Service\RendererServiceInterface;

class ManageController implements ManageControllerInterface
{
    /** @var \TinyIB\Cache\CacheInterface $cache */
    protected $cache;

    /** @var \TinyIB\Repository\BanRepositoryInterface $ban_repository */
    protected $ban_repository;

    /** @var \TinyIB\Repository\PostRepositoryInterface $post_repository */
    protected $post_repository;

    /** @var \TinyIB\Service\BanServiceInterface $ban_service */
    protected $ban_service;

    /** @var \TinyIB\Service\RendererServiceInterface $renderer */
    protected $renderer;

    /**
     * Constructs new manage controller.
     *
     * @param \TinyIB\Cache\CacheInterface $cache
     * @param \TinyIB\Repository\PostRepositoryInterface $post_repository
     * @param \TinyIB\Service\BanServiceInterface $ban_service
     * @param \TinyIB\Service\RendererServiceInterface $renderer
     */
    public function __construct(
        CacheInterface $cache,
        PostRepositoryInterface $post_repository,
        BanServiceInterface $ban_service,
        RendererServiceInterface $renderer
    ) {
        $this->cache = $cache;
        $this->post_repository = $post_repository;
        $this->ban_service = $ban_service;
        $this->renderer = $renderer;
    }

    /**
     * {@inheritDoc}
     */
    public function status(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $threads_count = $this->post_repository->getThreadCount();
        $bans_count = $this->ban_service->getCount();
        $data['info'] = $threads_count . ' ' . Functions::plural('thread', $threads_count) . ', '
            . $bans_count . ' ' . Functions::plural('ban', $bans_count);

        if (TINYIB_REQMOD === 'files' || TINYIB_REQMOD === 'all') {
            $data['reqmod_posts'] = array_map(function ($post) {
                /** @var \TinyIB\Models\PostInterface $post */
                $view_model = $post->createViewModel(TINYIB_INDEXPAGE);
                if (TINYIB_CACHE === 'database') {
                    // Do not cache individual posts in database mode.
                    $view_model['rendered'] = $this->renderer->renderPostViewModel($view_model, TINYIB_INDEXPAGE);
                    return $view_model;
                }

                $key = TINYIB_BOARD . ':index_post:' . $post->getID();
                $view_model['rendered'] = $this->cache->get($key);
                if ($view_model['rendered'] === null) {
                    $view_model['rendered'] = $this->renderer->renderPostViewModel($view_model, TINYIB_INDEXPAGE);
                    $this->cache->set($key, $view_model['rendered'], 4 * 60 * 60);
                }

                return $view_model;
            }, $this->post_repository->getLatestPosts(false));
        }

        $data['posts'] = array_map(function ($post) {
            /** @var \TinyIB\Models\PostInterface $post */
            $view_model = $post->createViewModel(TINYIB_INDEXPAGE);
            if (TINYIB_CACHE === 'database') {
                // Do not cache individual posts in database mode.
                $view_model['rendered'] = $this->renderer->renderPostViewModel($view_model, TINYIB_INDEXPAGE);
                return $view_model;
            }

            $key = TINYIB_BOARD . ':index_post:' . $post->getID();
            $view_model['rendered'] = $this->cache->get($key);
            if ($view_model['rendered'] === null) {
                $view_model['rendered'] = $this->renderer->renderPostViewModel($view_model, TINYIB_INDEXPAGE);
                $this->cache->set($key, $view_model['rendered'], 4 * 60 * 60);
            }

            return $view_model;
        }, $this->post_repository->getLatestPosts(true));

        return Response::ok($this->renderer->render('manage_status.twig', $data));
    }

    /**
     * Returns view model for a ban.
     *
     * @param \TinyIB\Model\BanInterface
     *
     * @return array
     */
    protected function banViewModel(BanInterface $ban) : array
    {
        return [
            'id' => $ban->getID(),
            'ip' => $ban->getIP(),
            'id' => $ban->getID(),
            'timestamp' => $ban->getCreatedDate(),
            'expire' => $ban->getExpiresDate(),
            'reason' => $ban->getReason(),
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function listBans(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $this->ban_service->removeExpired();

        $query = $request->getQuery();
        $data['ip'] = !empty($query['bans']) ? $query['bans'] : '';
        $data['bans'] = array_map([$this, 'banViewModel'], $this->ban_service->getAll());
        return Response::ok($this->renderer->render('manage_bans.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function addBan(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $this->ban_service->removeExpired();

        $request_data = $request->getData();
        $ip = $request_data['ip'];
        $is_ban_exists = $this->ban_service->getByIP($ip) !== null;
        if ($is_ban_exists) {
            $message = 'Sorry, there is already a ban on record for that IP address.';
            return Response::badRequest($message);
        }

        $duration = isset($request_data['expire']) ? $request_data['expire'] : 0;
        $expires_at = $duration !== 0 ? $duration + time() : 0;
        $reason = isset($request_data['reason']) ? $request_data['reason'] : '';
        $ban = $this->ban_service->create($ip, $expires_at, $reason);

        $query = $request->getQuery();
        $data['ip'] = !empty($query['bans']) ? $query['bans'] : '';
        $data['bans'] = array_map([$this, 'banViewModel'], $this->ban_service->getAll());
        $data['text'] = 'Ban record added for ' . $ban->getIP();
        return Response::ok($this->renderer->render('manage_bans.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function liftBan(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $this->ban_service->removeExpired();

        $query = $request->getQuery();
        $id = (int)$query['lift'];
        $ban = $this->ban_service->getByID($id);
        if (!isset($ban)) {
            $message = "Ban No.$id not found.";
            return Response::notFound($message);
        }

        $this->ban_service->liftByID($id);

        $data['ip'] = !empty($query['bans']) ? $query['bans'] : '';
        $data['bans'] = array_map([$this, 'banViewModel'], $this->ban_service->getAll());
        $data['text'] = 'Ban record lifted for ' . $ban->getIP();
        return Response::ok($this->renderer->render('manage_bans.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function moderate(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $path = $request->getPath();
        $path_parts = explode('/', $path);
        $id = count($path_parts) > 2 ? (int)$path_parts[2] : 0;
        if ($id <= 0) {
            return Response::ok($this->renderer->render('manage_moderate_form.twig', $data));
        }

        /** @var \TinyIB\Model\PostInterface $post */
        $post = $this->post_repository->getPostByID($id);
        if ($post === null) {
            $message = 'Sorry, there doesn\'t appear to be a post with that ID.';
            return Response::notFound($message);
        }

        $post_ip = $post->getIP();
        $data['has_ban'] = $this->ban_service->getByIP($post_ip) !== null;
        $data['post'] = $post->createViewModel(TINYIB_INDEXPAGE);

        $posts = $post->isThread() ? $this->post_repository->getPostsByThreadID($post->getID()) : [$post];

        $data['posts'] = array_map(function ($post) {
            /** @var \TinyIB\Models\PostInterface $post */
            $view_model = $post->createViewModel(TINYIB_INDEXPAGE);
            if (TINYIB_CACHE === 'database') {
                // Do not cache individual posts in database mode.
                $view_model['rendered'] = $this->renderer->renderPostViewModel($view_model, TINYIB_INDEXPAGE);
                return $view_model;
            }

            $key = TINYIB_BOARD . ':index_post:' . $post->getID();
            $view_model['rendered'] = $this->cache->get($key);
            if ($view_model['rendered'] === null) {
                $view_model['rendered'] = $this->renderer->renderPostViewModel($view_model, TINYIB_INDEXPAGE);
                $this->cache->set($key, $view_model['rendered'], 4 * 60 * 60);
            }

            return $view_model;
        }, $posts);

        return Response::ok($this->renderer->render('manage_moderate_post.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function delete(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $id = (int)explode('/', $request->getPath())[2];
        /** @var \TinyIB\Model\PostInterface $post */
        $post = $this->post_repository->getPostByID($id);
        if ($post === null) {
            $message = 'Sorry, there doesn\'t appear to be a post with that ID.';
            return Response::notFound($message);
        }

        $this->post_repository->deletePostByID($id);
        $this->cache->delete(TINYIB_BOARD . ":post:$id");
        $this->cache->deletePattern(TINYIB_BOARD . ':page:*');

        if ($post->isReply()) {
            $parent = $post->getParentID();
            $this->cache->delete(TINYIB_BOARD . ":index_post:$parent");
            $this->cache->delete(TINYIB_BOARD . ":thread:$parent");
        }

        $id = $post->getID();
        $data['text'] = "Post No.$id deleted.";
        return Response::ok($this->renderer->render('manage_info.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function approve(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $id = (int)explode('/', $request->getPath())[2];

        if ($id <= 0) {
            $message = 'Form data was lost. Please go back and try again.';
            return Response::badRequest($message);
        }

        /** @var \TinyIB\Model\PostInterface $post */
        $post = $this->post_repository->getPostByID($id);
        if ($post === null) {
            $message = 'Sorry, there doesn\'t appear to be a post with that ID.';
            return Response::notFound($message);
        }

        $this->post_repository->approvePostByID($id);
        $thread_id = $post->isThread() ? $id : $post->getParentID();

        if (strtolower($post->getEmail()) !== 'sage'
            && (TINYIB_MAXREPLIES === 0
            || $this->post_repository->getReplyCountByThreadID($thread_id) <= TINYIB_MAXREPLIES)) {
            $this->post_repository->bumpThreadByID($thread_id);
        }

        $this->cache->delete(TINYIB_BOARD . ":post:$id");
        $this->cache->delete(TINYIB_BOARD . ":index_post:$thread_id");
        $this->cache->delete(TINYIB_BOARD . ":thread:$thread_id");
        $this->cache->deletePattern(TINYIB_BOARD . ':page:*');

        $data['text'] = "Post No.$id approved.";
        return Response::ok($this->renderer->render('manage_info.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function setSticky(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $id = (int)explode('/', $request->getPath())[2];
        if ($id <= 0) {
            $message = 'Form data was lost. Please go back and try again.';
            return Response::badRequest($message);
        }

        /** @var \TinyIB\Model\PostInterface $post */
        $post = $this->post_repository->getPostByID($id);
        if ($post !== null || !$post->isThread()) {
            $message = 'Sorry, there doesn\'t appear to be a thread with that ID.';
            return Response::notFound($message);
        }

        $query = $request->getQuery();
        $sticky = !empty($query['setsticky']) ? (bool)intval($query['setsticky']) : false;
        $this->post_repository->stickyThreadByID($id, $sticky);
        $this->cache->delete(TINYIB_BOARD . ':post:' . $id);
        $this->cache->delete(TINYIB_BOARD . ':index_post:' . $id);
        $this->cache->delete(TINYIB_BOARD . ':thread:' . $id);
        $this->cache->deletePattern(TINYIB_BOARD . ':page:*');

        $id = $post->getID();
        $action = $sticky ? 'stickied' : 'un-stickied';
        $data['text'] = "Thread No.$id $action.";
        return Response::ok($this->renderer->render('manage_info.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function rawPost(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        return Response::ok($this->renderer->render('manage_raw_post_form.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function rebuildAll(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $this->cache->deletePattern(TINYIB_BOARD . ':post:*');
        $this->cache->deletePattern(TINYIB_BOARD . ':index_post:*');
        $this->cache->deletePattern(TINYIB_BOARD . ':thread:*');
        $this->cache->deletePattern(TINYIB_BOARD . ':page:*');

        $data['text'] = 'Rebuilt board.';
        return Response::ok($this->renderer->render('manage_info.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function update(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        if (is_dir('.git')) {
            $data['git_output'] = shell_exec('git pull 2>&1');
        }

        return Response::ok($this->renderer->render('manage_update.twig', $data));
    }

    /**
     * {@inheritDoc}
     */
    public function logout(Request $request) : Response
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return Response::ok($this->renderer->render('manage_login_form.twig', $data));
        }

        $_SESSION['tinyib'] = '';
        session_destroy();

        $url = '/' . TINYIB_BOARD . '/manage';
        return Response::redirect($url);
    }
}