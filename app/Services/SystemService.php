<?php

namespace Imageboard\Services;

use Imageboard\Services\Cache\CacheInterface;

class SystemService
{
  /** @var CacheInterface */
  protected $cache;

  /** @var ConfigService */
  protected $config;

  function __construct(
    CacheInterface $cache,
    ConfigService $config
  ) {
    $this->cache = $cache;
    $this->config = $config;
  }

  function clearCache()
  {
    $this->cache->deletePattern($this->config->get('BOARD') . ':*');
  }
}
