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
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            // http://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('games',
          array(
              'id' => 'SERIAL PRIMARY KEY',
              'name' => 'varchar(45) NOT NULL',
              'slug' => 'varchar(45) NOT NULL',
              'variant' => 'varchar(5) NOT NULL',
              'priority' => $this->integer(3),
          ), $tableOptions);
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
