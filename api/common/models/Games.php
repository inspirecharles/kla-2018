<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;
use yii\data\ActiveDataProvider;
use common\models\Games;

class Games extends ActiveRecord
{


    /**
     * @return string the name of the table associated with this ActiveRecord class.
     */
    public static function tableName()
    {
        return 'games';
    }

    public function rules()
    {
        return [
            [['name', 'slug'], 'required'],
            [['name'], 'string', 'max' => 45],
            [['slug'], 'string', 'max' => 45],
            [['slug'], 'unique'],
            [['priority'], 'integer', 'integerOnly' => true]
        ];
    }

    public function getResults()
    {
        return $this->hasMany(Results::className(), ['game_id' => 'id']);
    }
}
