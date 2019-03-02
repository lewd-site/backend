<?php

namespace Imageboard\Controller\Admin;

use Psr\Http\Message\{ServerRequestInterface, ResponseInterface};

interface BansControllerInterface
{
    /**
     * Returns the list of bans.
     *
     * @param ServerRequestInterface $request
     *
     * @return string Response HTML.
     *
     * @throws AccessDeniedException
     *   If current user is not an admin.
     */
    public function list(ServerRequestInterface $request) : string;
}
