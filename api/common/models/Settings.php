<?php

namespace common\models;

use Yii;
use yii\caching\DbDependency;
use yii\data\ActiveDataProvider;

/**
 * This is the model class for table "settings".
 *
 * @property integer $id
 * @property string $name
 * @property string $value
 */
class Settings extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'settings';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string', 'max' => 100],
            [['value'], 'string', 'max' => 1000],
            [['name'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('kla', 'ID'),
            'name' => Yii::t('kla', 'Name'),
            'value' => Yii::t('kla', 'Value'),
        ];
    }

    public function search($params) {
        $this->load($params);

        $qry = self::find();
        $qry->andFilterWhere(['ilike', 'name', $this->name]);

        $data_provider = new ActiveDataProvider([
            'query' => $qry->orderBy('name asc')
        ]);

        return $data_provider;
    }

    /**
     * Returns a specific value from the settings table, cached and updated if there are changes
     * @param $key
     * The setting key
     * @return mixed
     * false if no setting was found, else the value of the setting
     */
    public static function getSetting($key) {
        $dependancy = new DbDependency(['sql' => 'select value from '. Settings::tableName() . ' where name = \''.$key.'\'']);
        $result = Settings::getDb()->cache(function($db) use ($key) {
            $model = Settings::find()->where(['name' => $key])->one();
            if ($model) {
                return $model->value;
            }
            return false;
        }, 0, $dependancy);
        return $result;
    }

    public static function setSetting($key, $value) {
        //create or update a new setting
        $setting = Settings::find()->where(['name' => $key])->one();
        if (!$setting) {
            $setting = new Settings();
        }

        $setting->name = $key;
        $setting->value = $value;

        return $setting->save();
    }
}
