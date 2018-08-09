<?php

namespace TinyIB\Controller;

use TinyIB\Cache\CacheInterface;
use TinyIB\Request;
use TinyIB\Response;
use TinyIB\Service\RendererServiceInterface;

class SettingsController implements SettingsControllerInterface
{
    /** @var \TinyIB\Cache\CacheInterface $cache */
    protected $cache;

    /** @var \TinyIB\RendererService\RendererServiceInterface $renderer */
    protected $renderer;

    /**
     * Constructs new settings controller.
     *
     * @param \TinyIB\Cache\CacheInterface $cache
     * @param \TinyIB\Service\RendererServiceInterface $renderer
     */
    public function __construct(CacheInterface $cache, RendererServiceInterface $renderer)
    {
        $this->cache = $cache;
        $this->renderer = $renderer;
    }

    /**
     * {@inheritDoc}
     */
    public function settings(Request $request) : Response
    {
        return Response::ok($this->renderer->render('settings.twig'));
    }
}
