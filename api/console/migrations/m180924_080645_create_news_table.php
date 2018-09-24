<?php

use yii\db\Migration;

/**
 * Handles the creation of table `news`.
 */
class m180924_080645_create_news_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('news', [
            'id' => $this->primaryKey(),
            'title' => 'varchar(225) NULL',
            'author_id' => $this->integer()->null()->defaultValue(null),
            'tags' => 'text NULL',
            'slug' => 'text NOT NULL',
            'recommended'  => 'integer DEFAULT 0',
            'art_status' => 'smallint DEFAULT 0',
            'feat_img' => 'varchar(225) NULL',
            'article' => 'text NULL',
            'yr_month' => 'varchar(7) NULL',
            'date_submitted' => 'timestamp NULL DEFAULT CURRENT_TIMESTAMP',
        ]);

        // creates index for column `author_id`
        $this->createIndex(
            'idx-news-author_id',
            'news',
            'author_id'
        );

        // add foreign key for table `user`
        $this->addForeignKey(
            'fk-news-author_id',
            'news',
            'author_id',
            'user',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('news');
    }
}
