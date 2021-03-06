<?php

namespace Imageboard\Repositories;

use Doctrine\DBAL\Query\QueryBuilder;
use Imageboard\Models\ModLog;
use Imageboard\Services\DatabaseService;

class ModLogRepository implements Repository
{
  const TABLE = 'mod_log';

  /** @var DatabaseService */
  protected $database;

  function __construct(DatabaseService $database)
  {
    $this->database = $database;
  }

  protected function mapToModel(array $row): ModLog
  {
    return new ModLog($row, false);
  }

  function add(ModLog $entry): ModLog
  {
    $connection = $this->database->getConnection();
    $builder = $connection->createQueryBuilder();
    $builder->insert(static::TABLE)
      ->values([
        'created_at' => $builder->createNamedParameter($entry->created_at),
        'updated_at' => $builder->createNamedParameter($entry->updated_at),
        'message'    => $builder->createNamedParameter($entry->message),
        'user_id'    => $builder->createNamedParameter($entry->user_id),
      ])
      ->execute();

    $entry->setId($connection->lastInsertId());
    return $entry;
  }

  /**
   * @return int
   */
  function getCount(int $date_from = 0, int $date_to = (1 << 31) - 1): int
  {
    $connection = $this->database->getConnection();
    $builder = $connection->createQueryBuilder();
    $query = $builder->select('COUNT(l.id)')
      ->from(static::TABLE, 'l')
      ->where('l.created_at >= ' . $builder->createNamedParameter($date_from))
      ->andWhere('l.created_at < ' . $builder->createNamedParameter($date_to));

    return (int)$query->execute()->fetchColumn();
  }

  protected function getBaseQuery(): QueryBuilder {
    $connection = $this->database->getConnection();
    $builder = $connection->createQueryBuilder();
    return $builder->select(
      'l.id',
      'l.created_at',
      'l.updated_at',
      'l.message',
      'l.user_id'
      )
      ->from(static::TABLE, 'l');
  }

  /**
   * @return ModLog[]
   */
  function getAll(int $date_from = 0, int $date_to = (1 << 31) - 1, $skip = null, $take = null): array
  {
    $query = $this->getBaseQuery();
    $query = $query->where('l.created_at >= ' . $query->createNamedParameter($date_from))
      ->andWhere('l.created_at < ' . $query->createNamedParameter($date_to))
      ->orderBy('l.id', 'desc');

    if (isset($skip)) {
      $query = $query->setFirstResult($skip);
    }

    if (isset($take)) {
      $query = $query->setMaxResults($take);
    }

    $rows = $query->execute()->fetchAll();
    return array_map([$this, 'mapToModel'], $rows);
  }
}
