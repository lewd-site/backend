<?php

namespace Imageboard\Models;

abstract class Model
{
  /**
   * Model constructor.
   *
   * @param array $attributes
   */
  function __construct(array $attributes = [])
  {
    foreach ($attributes as $key => $value) {
      $this->$key = $value;
    }
  }

  /**
   * Allows read-only access to private & protected properties.
   *
   * @param string
   *
   * @return bool
   */
  function __isset(string $name): bool
  {
    if (property_exists($this, $name)) {
      return true;
    }

    return false;
  }

  /**
   * Allows read-only access to private & protected properties.
   *
   * @param string
   *
   * @return mixed
   */
  function __get(string $name)
  {
    if (property_exists($this, $name)) {
      return $this->$name;
    }

    return null;
  }
}
