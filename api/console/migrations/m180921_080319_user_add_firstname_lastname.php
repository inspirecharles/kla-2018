<?php

use yii\db\Migration;

/**
 * Class m180921_080319_user_add_firstname_lastname
 */
class m180921_080319_user_add_firstname_lastname extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('user', 'firstname',$this->string(50));
        $this->addColumn('user', 'lastname',$this->string(50));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180921_080319_user_add_firstname_lastname cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180921_080319_user_add_firstname_lastname cannot be reverted.\n";

        return false;
    }
    */
}
