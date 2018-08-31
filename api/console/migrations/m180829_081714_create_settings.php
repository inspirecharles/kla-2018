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

        $this->insert('settings', ['name' => 'google-tag-manager','value' => NULL]);
        $this->insert('settings', ['name' => 'google-analytics','value' => NULL]);
        $this->insert('settings', ['name' => 'google-webmaster-tools','value' => NULL]);
        $this->insert('settings', ['name' => 'bing-webmaster-tools','value' => NULL]);
        $this->insert('settings', ['name' => 'results-api-secret','value' => NULL]);
        $this->insert('settings', ['name' => 'country', 'value' => NULL]);
        $this->insert('settings', ['name' => 'nationality', 'value' => NULL]);
        $this->insert('settings', ['name' => 'variant', 'value' => NULL]);
        $this->insert('settings', ['name' => 'site-url', 'value' => NULL]);
        $this->insert('settings', ['name' => 'site-name', 'value' => NULL]);
        $this->insert('settings', ['name' => 'title', 'value' => NULL]);
        $this->insert('settings', ['name' => 'admin-email', 'value' => NULL]);
        $this->insert('settings', ['name' => 'support-email', 'value' => NULL]);
        $this->insert('settings', ['name' => 'international-sites', 'value' => NULL]);
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
