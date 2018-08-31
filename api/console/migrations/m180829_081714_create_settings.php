<?php

use yii\db\Migration;

/**
 * Class m180829_081714_create_settings
 */
class m180829_081714_create_settings extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('settings', [
            'id' => $this->primaryKey(),
            'name' => $this->string(100)->notNull()->unique(),
            'value' => $this->string(1000)
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180829_081714_create_settings cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180829_081714_create_settings cannot be reverted.\n";

        return false;
    }
    */
}
