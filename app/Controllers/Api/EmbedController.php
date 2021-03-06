<?php

namespace Imageboard\Controllers\Api;

use GuzzleHttp\Psr7\Response;
use Imageboard\Exceptions\{AccessDeniedException, NotFoundException};
use Imageboard\Controllers\ControllerInterface;
use Imageboard\Services\Cache\CacheInterface;
use Psr\Http\Message\{ServerRequestInterface, ResponseInterface};

class EmbedController implements ControllerInterface
{
  const CACHE_TTL = 4 * 60 * 60;

  /** @var CacheInterface */
  protected $cache;

  function __construct(
    CacheInterface $cache
  ) {
    $this->cache = $cache;
  }

  /**
   * Checks if URL is allowed.
   *
   * @param string $url
   *
   * @return bool
   */
  protected function isAllowed(string $url): bool
  {
    $allowed = [
      '/^https?:\/\/(?:www\.)?coub\.com\//',
      '/^https?:\/\/(?:www\.)?youtube\.com\//',
      '/^https?:\/\/(?:www\.)?youtu\.be\//',
    ];

    foreach ($allowed as $pattern) {
      if (preg_match($pattern, $url)) {
        return true;
      }
    }

    return false;
  }

  /** @api {get} /api/embed?url=:url Get embed data
   * @apiName Get embed data
   * @apiGroup embed
   * @apiVersion 0.1.0
   * @apiDescription Fetches data from the specified URL and returns it as is.
   *  Used to proxy requests to external APIs, in order to avoid issues with CORS.
   *
   * @apiParam (Query) {String} url External API URL to fetch data from.
   *
   * @apiParamExample {json} Example
   *  {
   *    "url": "https://coub.com/api/v2/coubs/13246m"
   *  }
   */

  /**
   * Fetches a content from the URL.
   *
   * @param ServerRequestInterface $request
   *
   * @return ResponseInterface
   */
  function embed(ServerRequestInterface $request): ResponseInterface
  {
    $params = $request->getQueryParams();
    if (!isset($params['url'])) {
      throw new NotFoundException('URL is not specified');
    }

    $url = $params['url'];
    if (!$this->isAllowed($url)) {
      throw new AccessDeniedException('URL is not allowed');
    }

    $headers = [];

    $data_key = "embed:$url";
    $content_type_key = "embed_ct:$url";

    $data = $this->cache->get($data_key);
    $content_type = $this->cache->get($content_type_key);

    if (isset($data) && isset($content_type)) {
      $headers['X-Cached'] = 'true';
    } else {
      $headers['X-Cached'] = 'false';

      try {
        $data = file_get_contents($url);
      } catch (\Exception $exception) {
        $reason = preg_replace('/HTTP\/[0-9.]+\s/', '', $http_response_header[0]);
        throw new NotFoundException("Can't fetch data from the specified URL: $reason");
      }

      $this->cache->set($data_key, $data, static::CACHE_TTL);

      $content_type = 'application/json';
      // Copy content type from the response.
      foreach ($http_response_header as $line) {
        $header = 'Content-Type: ';
        if (strncmp($line, $header, strlen($header)) === 0) {
          $content_type = substr($line, strlen($header));
          break;
        }
      }
      $this->cache->set($content_type_key, $content_type, static::CACHE_TTL);
    }

    $headers['Content-Type'] = $content_type;
    return new Response(200, $headers, $data);
  }
}
