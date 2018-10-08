<?php

use yii\db\Migration;

/**
 * Class m180926_084337_create_table_for_emails
 */
class m180926_084337_create_table_for_emails extends Migration
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

        $this->createTable('emails',
          array(
              'id' => 'SERIAL PRIMARY KEY',
              'email' =>  'text',
          ), $tableOptions);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180926_084337_create_table_for_emails cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180926_084337_create_table_for_emails cannot be reverted.\n";

        return false;
    }
    */
}
