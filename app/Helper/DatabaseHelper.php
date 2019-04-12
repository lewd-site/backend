<?php

namespace Imageboard\Helper;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;
use Imageboard\Service\ConfigServiceInterface;

class DatabaseHelper implements HelperInterface
{
  protected $_configService;

  public function __construct (ConfigServiceInterface $configService) {
    $this->_configService = $configService;
  }

  /**
   * Provider Sqlite
   *
   * @return bool
   */
  public function isSqlite() : bool {
    $result = strtolower($this->_configService->get('DBDRIVER')) == 'sqlite';
    return $result;
  }

  /**
   * Database full path
   *
   * @return string
   */
  public function getFullPath() : string {
    // Is full path or :memory:
    // TODO: Add fix for Windows-based OSes
    if($this->isSqlite() && !in_array($this->_configService->get('DBNAME')[0] ?? ':', ['/', ':'])) {
      $dbPath = $this->_configService->get('ROOT', __DIR__ . '/../..')
        . DIRECTORY_SEPARATOR
        . $this->_configService->get('DBNAME');


      return $dbPath;
    }

    return $this->_configService->get('DBNAME');
  }

  public function createDatabaseStructure() {
    if (!Capsule::schema()->hasTable($this->_configService->get('DBBANS'))) {
      Capsule::schema()->create($this->_configService->get('DBBANS'), function (Blueprint $table) {
        $table->increments('id');
        $table->string('ip');
        $table->string('reason')->nullable();
        $table->integer('expires_at')->default(0);
        $table->integer('created_at')->default(0);
        $table->integer('updated_at')->default(0);
        $table->integer('deleted_at')->nullable();
      });
    }

    if (!Capsule::schema()->hasTable('users')) {
      Capsule::schema()->create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('email')->unique();
        $table->char('password_hash', 60);
        $table->integer('role')->index()->default(0);
        $table->integer('created_at')->default(0);
        $table->integer('updated_at')->default(0);
        $table->integer('deleted_at')->nullable();
      });
    }

    if (!Capsule::schema()->hasTable('tokens')) {
      Capsule::schema()->create('tokens', function (Blueprint $table) {
        $table->increments('id');
        $table->string('token', 32)->unique();
        $table->integer('expires_at');
        $table->integer('created_at')->default(0);
        $table->integer('updated_at')->default(0);
        $table->integer('user_id');
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
      });
    }

    if (!Capsule::schema()->hasTable('mod_log')) {
      Capsule::schema()->create('mod_log', function (Blueprint $table) {
        $table->increments('id');
        $table->string('message');
        $table->integer('created_at');
        $table->integer('updated_at');
        $table->integer('user_id')->nullable();
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
      });
    }

    if (!Capsule::schema()->hasTable($this->_configService->get("DBPOSTS"))) {
      Capsule::schema()->create($this->_configService->get("DBPOSTS"), function (Blueprint $table) {
        $table->increments('id');
        $table->integer('parent_id')->index()->default(0);
        $table->integer('user_id')->index()->default(0);
        $table->string('ip', 39);
        $table->string('name', 75);
        $table->string('tripcode', 22);
        $table->string('email', 75);
        $table->string('subject', 75);
        $table->text('message');
        $table->string('password');
        $table->string('file')->nullable();
        $table->string('file_hex', 75)->nullable();
        $table->string('file_original')->nullable();
        $table->integer('file_size')->default(0);
        $table->integer('image_width')->default(0);
        $table->integer('image_height')->default(0);
        $table->string('thumb')->nullable();
        $table->integer('thumb_width')->default(0);
        $table->integer('thumb_height')->default(0);
        $table->boolean('stickied')->index()->default(false);
        $table->boolean('moderated')->index()->default(true);
        $table->integer('created_at')->default(0);
        $table->integer('bumped_at')->index()->default(0);
        $table->integer('updated_at')->default(0);
        $table->integer('deleted_at')->nullable();
      });
    }
  }
}
