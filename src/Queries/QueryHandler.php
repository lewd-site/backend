<?php

namespace TinyIB\Queries;

abstract class QueryHandler implements QueryHandlerInterface
{
    /** @var \PDO $pdo */
    protected $pdo;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Returns SQL to handle query.
     *
     * @return string SQL query
     */
    protected abstract function sql(): string;

    /**
     * Returns array of query params, required in query string.
     *
     * @param string $sql SQL query
     * @param QueryInterface $query Query object
     *
     * @return array
     */
    protected function getParams(string $sql, $query) : array
    {
        $params = $query->toArray();
        return array_filter($params, function ($param) use ($sql) {
            return strpos($sql, ':' . $param) !== false;
        }, ARRAY_FILTER_USE_KEY);
    }
}
