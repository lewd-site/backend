<?php

namespace Imageboard\Controller;

use GuzzleHttp\Psr7\Response;
use Imageboard\Model\Post;
use Imageboard\Service\ConfigService;
use Psr\Http\Message\ResponseInterface;
use SimpleXMLElement;

class SitemapController implements ControllerInterface
{
  protected function addURL(SimpleXMLElement $xml, string $path, int $modified, string $changefreq, float $priority)
  {
    $protocol = $_SERVER['REQUEST_SCHEME'] ?? 'https';
    $hostname = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $basePath = ConfigService::getInstance()->get('BASE_PATH', '/');

    $url = $xml->addChild('url');
    $url->addChild('loc', $protocol . '://' . $hostname . $basePath . $path);

    if ($modified) {
      $url->addChild('lastmod', date('c', $modified));
    }

    $url->addChild('changefreq', $changefreq);
    $url->addChild('priority', number_format($priority, 2));

    return $url;
  }

  /**
   * Returns the sitemap.xml.
   *
   * @return ResponseInterface
   */
  function sitemap(): ResponseInterface
  {
    $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');

    /** @var Post $latest */
    $latest = Post::orderBy('created_at', 'desc')->first();
    if (isset($latest)) {
      $latestUpdate = $latest->getCreatedTimestamp();
    } else {
      $latestUpdate = time();
    }

    $this->addURL($xml, '', $latestUpdate, 'daily', 1.0);

    for ($page = 0;; $page++) {
      $threads = Post::getThreadsByPage($page);
      if ($threads->isEmpty()) {
        break;
      }

      if ($page > 0) {
        /** @var Post $latestThread */
        $latestThread = $threads->first();
        $this->addURL($xml, "/$page", $latestThread->getBumpedTimestamp(), 'daily', 0.75);
      }

      foreach ($threads as $thread) {
        /** @var Post $thread */
        $this->addURL($xml, "/res/{$thread->id}", $thread->getBumpedTimestamp(), 'daily', 0.5);
      }
    }

    $this->addURL($xml, '/settings', 0, 'monthly', 0.25);
    $this->addURL($xml, '/auth/register', 0, 'monthly', 0.25);
    $this->addURL($xml, '/auth/login', 0, 'monthly', 0.25);

    return new Response(200, ['Content-Type' => 'text/xml'], $xml->asXML());
  }
}
