<?php

use yii\db\Migration;

/**
 * Class m180914_065052_add_video_link
 */
class m180914_065052_add_video_link extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
         $this->addColumn('results', 'video_link','text');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180914_065052_add_video_link cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180914_065052_add_video_link cannot be reverted.\n";

        return false;
    }
    */
}
