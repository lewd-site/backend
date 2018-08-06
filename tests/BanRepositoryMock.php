<?php

namespace TinyIB\Tests;

use TinyIB\Model\Ban;
use TinyIB\Model\BanInterface;
use TinyIB\Repository\BanRepositoryInterface;

class BanRepositoryMock implements BanRepositoryInterface
{
    /**
     * {@inheritDoc}
     */
    public function getAll($conditions = [], $order = null, $columns = '*')
    {
        return [];
    }

    /**
     * {@inheritDoc}
     */
    public function getRange($conditions, $order, $take, $skip = 0, $columns = '*')
    {
        return [];
    }

    /**
     * {@inheritDoc}
     */
    public function getOne($conditions, $order = null, $columns = '*')
    {
        return [];
    }

    /**
     * {@inheritDoc}
     */
    public function getCount($conditions, $columns = '*')
    {
        return 0;
    }

    /**
     * {@inheritDoc}
     */
    public function insert($data)
    {
        return 0;
    }

    /**
     * {@inheritDoc}
     */
    public function update($conditions, $data)
    {
        return 0;
    }

    /**
     * {@inheritDoc}
     */
    public function delete($conditions)
    {
        return 0;
    }

    /**
     * {@inheritDoc}
     */
    public function inTransaction()
    {
        return false;
    }

    /**
     * {@inheritDoc}
     */
    public function beginTransaction()
    {
        return true;
    }

    /**
     * {@inheritDoc}
     */
    public function commit()
    {
        return true;
    }

    /**
     * {@inheritDoc}
     */
    public function getLastInsertId() : string
    {
        return '0';
    }
}
