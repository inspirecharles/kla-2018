<?php

use yii\db\Migration;

/**
 * Class m180817_025722_create_games
 */
class m180817_025722_create_games extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('games',
          array(
              'id' => 'SERIAL PRIMARY KEY',
              'name' => 'varchar(45) NOT NULL',
              'slug' => 'varchar(45) NOT NULL',
              'variant' => 'varchar(5) NOT NULL',
              'priority' => $this->integer(3),
          ));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('games');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180817_025722_create_games cannot be reverted.\n";

        return false;
    }
    */
}
