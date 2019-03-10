<?php

namespace Imageboard\Controller;

use Psr\Http\Message\{ServerRequestInterface, ResponseInterface};

interface ApiControllerInterface
{
  /**
   * Fetches a content from the URL.
   *
   * @return ResponseInterface
   */
  function embed(ServerRequestInterface $request) : ResponseInterface;
}
