<?php

use yii\db\Migration;

/**
 * Class m180924_101440_add_stats_in_results
 */
class m180924_101440_add_stats_in_results extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('results', 'stats','text');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180924_101440_add_stats_in_results cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180924_101440_add_stats_in_results cannot be reverted.\n";

        return false;
    }
    */
}
