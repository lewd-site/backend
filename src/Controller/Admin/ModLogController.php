<?php

namespace TinyIB\Controller\Admin;

use GuzzleHttp\Psr7\Response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TinyIB\AccessDeniedException;
use TinyIB\Model\ModLog;
use TinyIB\Service\RendererServiceInterface;

class ModLogController extends CrudController implements ModLogControllerInterface
{
    /**
     * Creates a new AuthController instance.
     *
     * @param RendererServiceInterface $renderer
     */
    public function __construct(
        RendererServiceInterface $renderer
    ) {
        parent::__construct($renderer);
    }

    /**
     * {@inheritDoc}
     */
    public function list(ServerRequestInterface $request) : ResponseInterface
    {
        if (!$this->checkAccess($request)) {
            throw new AccessDeniedException('You are not allowed to access this page');
        }

        $items = ModLog::with('user')->orderBy('id', 'desc')->get();
        $content = $this->renderer->render('admin/modlog/list.twig', [
            'items' => $items,
        ]);

        return new Response(200, [], $content);
    }
}
