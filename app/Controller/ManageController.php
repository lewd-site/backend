<?php

namespace Imageboard\Controller;

use GuzzleHttp\Psr7\Response;
use Imageboard\Cache\CacheInterface;
use Imageboard\Exception\{NotFoundException, ValidationException};
use Imageboard\Functions;
use Imageboard\Model\{Ban, Post};
use Imageboard\Service\RendererServiceInterface;
use Psr\Http\Message\ServerRequestInterface;

class ManageController implements ManageControllerInterface
{
    /** @var CacheInterface */
    protected $cache;

    /** @var RendererServiceInterface */
    protected $renderer;

    /**
     * Constructs new manage controller.
     *
     * @param CacheInterface $cache
     * @param RendererServiceInterface $renderer
     */
    public function __construct(
        CacheInterface $cache,
        RendererServiceInterface $renderer
    ) {
        $this->cache = $cache;
        $this->renderer = $renderer;
    }

    /**
     * {@inheritDoc}
     */
    public function status() : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        $threads_count = Post::getThreadCount();
        $bans_count = Ban::count();
        $data['info'] = $threads_count . ' ' . Functions::plural('thread', $threads_count) . ', '
            . $bans_count . ' ' . Functions::plural('ban', $bans_count);

        if (TINYIB_REQMOD === 'files' || TINYIB_REQMOD === 'all') {
            $data['reqmod_posts'] = Post::getLatestPosts(false);
        }

        $data['posts'] = Post::getLatestPosts(true);
        return $this->renderer->render('manage_status.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function listBans(ServerRequestInterface $request) : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        Ban::removeExpired();

        $query = $request->getQueryParams();
        $data['ip'] = !empty($query['bans']) ? $query['bans'] : '';
        $data['bans'] = Ban::orderBy('created_at', 'desc')->get();
        return $this->renderer->render('manage_bans.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function addBan(ServerRequestInterface $request) : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        Ban::removeExpired();

        $request_data = $request->getParsedBody();
        $ip = $request_data['ip'];
        $is_ban_exists = Ban::where('ip', $ip)->first() !== null;
        if ($is_ban_exists) {
            $message = 'Sorry, there is already a ban on record for that IP address.';
            throw new ValidationException($message);
        }

        $duration = isset($request_data['expire']) ? (int)$request_data['expire'] : 0;
        $expires_at = $duration !== 0 ? $duration + time() : 0;
        $reason = isset($request_data['reason']) ? $request_data['reason'] : '';
        $ban = Ban::create([
            'ip' => $ip,
            'expires_at' => $expires_at,
            'reason' => $reason,
        ]);

        $query = $request->getQueryParams();
        $data['ip'] = !empty($query['bans']) ? $query['bans'] : '';
        $data['bans'] = Ban::orderBy('created_at', 'desc')->get();
        $data['text'] = 'Ban record added for ' . $ban->ip;
        return $this->renderer->render('manage_bans.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function liftBan(ServerRequestInterface $request, array $args) : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        Ban::removeExpired();

        $query = $request->getQueryParams();
        $id = (int)$args['id'];
        $ban = Ban::find($id);
        if (!isset($ban)) {
            $message = "Ban No.$id not found.";
            throw new NotFoundException($message);
        }

        Ban::where('id', $id)->delete();

        $data['ip'] = !empty($query['bans']) ? $query['bans'] : '';
        $data['bans'] = Ban::orderBy('created_at', 'desc')->get();
        $data['text'] = 'Ban record lifted for ' . $ban->ip;
        return $this->renderer->render('manage_bans.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function moderate(array $args) : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        $id = (int)($args['id'] ?? 0);
        if ($id <= 0) {
            return $this->renderer->render('manage_moderate_form.twig', $data);
        }

        /** @var Post */
        $post = Post::find($id);
        if ($post === null) {
            $message = 'Sorry, there doesn\'t appear to be a post with that ID.';
            throw new NotFoundException($message);
        }

        $post_ip = $post->ip;
        $data['has_ban'] = Ban::where('ip', $post_ip)->first() !== null;
        $data['post'] = $post;
        $data['posts'] = $post->isThread() ? Post::getPostsByThreadID($post->id) : collect([$post]);

        return $this->renderer->render('manage_moderate_post.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function delete(array $args) : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        $id = (int)$args['id'];
        /** @var Post */
        $post = Post::find($id);
        if ($post === null) {
            $message = 'Sorry, there doesn\'t appear to be a post with that ID.';
            throw new NotFoundException($message);
        }

        Post::deletePostByID($id);
        $this->cache->deletePattern(TINYIB_BOARD . ':page:*');
        $this->cache->deletePattern(TINYIB_BOARD . ':mobile:page:*');

        if ($post->isReply()) {
            $parent = $post->parent_id;
            $this->cache->deletePattern(TINYIB_BOARD . ":thread:$parent:*");
        }

        $id = $post->id;
        $data['text'] = "Post No.$id deleted.";
        return $this->renderer->render('manage_info.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function approve(array $args) : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        $id = (int)$args['id'];
        if ($id <= 0) {
            $message = 'Form data was lost. Please go back and try again.';
            throw new ValidationException($message);
        }

        /** @var Post */
        $post = Post::find($id);
        if ($post === null) {
            $message = 'Sorry, there doesn\'t appear to be a post with that ID.';
            throw new NotFoundException($message);
        }

        $post->moderated = true;
        $post->save();

        $thread_id = $post->isThread() ? $id : $post->parent_id;

        if (strtolower($post->email) !== 'sage'
            && (TINYIB_MAXREPLIES === 0
            || Post::getReplyCountByThreadID($thread_id) <= TINYIB_MAXREPLIES)) {
            $thread = Post::find($thread_id);
            if (isset($thread)) {
                $thread->bumped_at = time();
                $thread->save();
            }
        }

        $this->cache->deletePattern(TINYIB_BOARD . ":thread:$thread_id:*");
        $this->cache->deletePattern(TINYIB_BOARD . ':page:*');
        $this->cache->deletePattern(TINYIB_BOARD . ':mobile:page:*');

        $data['text'] = "Post No.$id approved.";
        return $this->renderer->render('manage_info.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function setSticky(ServerRequestInterface $request, array $args) : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        $id = (int)$args['id'];
        if ($id <= 0) {
            $message = 'Form data was lost. Please go back and try again.';
            throw new ValidationException($message);
        }

        /** @var Post */
        $post = Post::find($id);
        if ($post === null || !$post->isThread()) {
            $message = 'Sorry, there doesn\'t appear to be a thread with that ID.';
            throw new NotFoundException($message);
        }

        $query = $request->getQueryParams();
        $sticky = !empty($query['setsticky']) ? (bool)intval($query['setsticky']) : false;
        $post->stickied = $sticky;
        $post->save();

        $this->cache->deletePattern(TINYIB_BOARD . ":thread:$id:*");
        $this->cache->deletePattern(TINYIB_BOARD . ':page:*');
        $this->cache->deletePattern(TINYIB_BOARD . ':mobile:page:*');

        $id = $post->id;
        $action = $sticky ? 'stickied' : 'un-stickied';
        $data['text'] = "Thread No.$id $action.";
        return $this->renderer->render('manage_info.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function rawPost() : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        return $this->renderer->render('manage_raw_post_form.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function rebuildAll() : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        $this->cache->deletePattern(TINYIB_BOARD . ':*');

        $data['text'] = 'Rebuilt board.';
        return $this->renderer->render('manage_info.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function update() : string
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in || !$is_admin) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        if (is_dir('.git')) {
            $data['git_output'] = shell_exec('git pull 2>&1');
        }

        return $this->renderer->render('manage_update.twig', $data);
    }

    /**
     * {@inheritDoc}
     */
    public function logout()
    {
        list($logged_in, $is_admin) = Functions::manageCheckLogIn();

        $data = [
            'is_admin' => $is_admin,
            'is_logged_in' => $logged_in,
            'is_manage_page' => true,
        ];

        if (!$logged_in) {
            return $this->renderer->render('manage_login_form.twig', $data);
        }

        $_SESSION['tinyib'] = '';
        session_destroy();

        $url = '/' . TINYIB_BOARD . '/manage';
        return new Response(302, ['Location' => $url]);
    }
}
