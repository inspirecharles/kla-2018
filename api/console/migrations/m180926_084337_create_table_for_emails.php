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
        $this->createTable('emails',
          array(
              'id' => 'SERIAL PRIMARY KEY',
              'email' =>  'text',
          ));
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
