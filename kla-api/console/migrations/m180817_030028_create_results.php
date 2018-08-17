<?php

use yii\db\Migration;

/**
 * Class m180817_030028_create_results
 */
class m180817_030028_create_results extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('results',
            array(
                'id' => 'SERIAL PRIMARY KEY',
                'game_id' => 'INTEGER REFERENCES games(id)',
                'draw_id' => 'INTEGER NOT NULL',
                'draw_date' => 'TIMESTAMP',
                'main_numbers' => 'text',
                'supp_numbers' => 'varchar(100)',
                'dividends' => 'text',
                'powerball_numbers' => 'varchar(100) NULL',
                'strike_numbers' => 'varchar(100) NULL'
            )
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('results');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180817_030028_create_results cannot be reverted.\n";

        return false;
    }
    */
}
