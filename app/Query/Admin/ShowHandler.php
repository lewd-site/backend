<?php

namespace Imageboard\Query\Admin;

use Imageboard\Exception\NotFoundException;
use Imageboard\Query\QueryHandler;

abstract class ShowHandler extends QueryHandler
{
  /**
   * Returns item.
   *
   * @param ShowPost $query
   *
   * @throws NotFoundException
   *   If item is not found.
   */
  function handle($query)
  {
    $sql = $this->sql();
    $statement = $this->pdo->prepare($sql);
    $params = $this->getParams($sql, $query);
    $statement->execute($params);
    $item = $statement->fetch();
    if (empty($item)) {
      throw new NotFoundException();
    }

    return $item;
  }
}