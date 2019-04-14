<?php

namespace Imageboard\Query;

use Imageboard\Service\ConfigService;
use PDO;

class BoardThreadsHandler extends QueryHandler
{
  /**
   * {@inheritDoc}
   * @throws \Imageboard\Exception\ConfigServiceException
   */
  protected function sql(): string
  {
    $posts_table = (new ConfigService())->get("DBPOSTS");;
    $sql = <<<EOF
SELECT p.id, p.created_at, p.bumped_at,
  p.subject, p.name, p.tripcode, p.message,
  p.file, p.image_width, p.image_height, p.file_size,
  p.thumb, p.thumb_width, p.thumb_height
FROM $posts_table AS p
WHERE p.deleted_at IS NULL
  AND p.parent_id = 0
ORDER BY p.bumped_at DESC
EOF;
    return $sql;
  }

  /**
   * Returns thread posts.
   *
   * @param BoardThreads $query
   */
  function handle($query)
  {
    $sql = $this->sql();
    $statement = $this->pdo->prepare($sql);
    $statement->setFetchMode(PDO::FETCH_ASSOC);
    $params = $this->getParams($sql, $query);
    $statement->execute($params);
    return $statement->fetchAll();
  }
}
