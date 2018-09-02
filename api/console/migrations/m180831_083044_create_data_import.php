<?php

use yii\db\Migration;

/**
 * Class m180831_083044_create_data_import
 */
class m180831_083044_create_data_import extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('data_import', [
            'name' => $this->string(50),
            'import_date' => $this->timestamp()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180831_083044_create_data_import cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180831_083044_create_data_import cannot be reverted.\n";

        return false;
    }
    */
}
