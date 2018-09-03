<?php

namespace common\models;

use Yii;
use yii\data\ActiveDataProvider;
use common\models\Games;
use yii\db\Query;

/**
 * This is the model class for table "results".
 *
 * @property integer $id
 * @property integer $game_id
 * @property integer $draw_id
 * @property string $draw_date
 * @property string $main_numbers
 * @property string $supp_numbers
 * @property string $dividends
 *
 * @property Games $game
 */
class Results extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'results';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['game_id', 'draw_id'], 'integer'],
            [['draw_date'], 'required'],
            [['dividends'], 'string'],
            [['draw_date'], 'string', 'max' => 50],
            [['main_numbers'], 'string'],
            [['supp_numbers'], 'string', 'max' => 100],
            [['game_id'], 'exist', 'skipOnError' => true, 'targetClass' => Games::className(), 'targetAttribute' => ['game_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'game_id' => 'Game ID',
            'draw_id' => 'Draw ID',
            'draw_date' => 'Draw Date',
            'main_numbers' => 'Main Numbers',
            'supp_numbers' => 'Supp Numbers',
            'dividends' => 'Dividends',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getGame()
    {
        return $this->hasOne(Games::className(), ['id' => 'game_id']);
    }
}
