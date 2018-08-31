<?php

namespace console\models;

use Yii;

/**
 * This is the model class for table "data_import".
 *
 * @property string $name
 * @property string $import_date
 */
class DataImportModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'data_import';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['import_date'], 'safe'],
            [['name'], 'string', 'max' => 50],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'name' => 'Name',
            'import_date' => 'Import Date',
        ];
    }
}
