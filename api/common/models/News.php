<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;
use yii\data\ActiveDataProvider;

class News extends ActiveRecord
{
    /**
     * @return string the name of the table associated with this ActiveRecord class.
     */
    public static function tableName()
    {
        return 'news';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tags', 'article', 'slug'], 'string'],
            [['art_status', 'author_id'], 'integer'],
            [['title'], 'string', 'max' => 225],
            [['title', 'slug'], 'required'],
            [['yr_month'], 'string', 'max' => 7]
        ];
    }
}
