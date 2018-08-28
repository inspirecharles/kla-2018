<?php

namespace frontend\controllers;

use yii\rest\ActiveController;

class GamesController extends ActiveController
{
    public $modelClass = 'common\models\Games';

   	public function behaviors()
    {
        return [
            [
                'class' => \yii\filters\ContentNegotiator::className(),
                'only' => ['index', 'view'],
                'formats' => [
                    'application/json' => \yii\web\Response::FORMAT_JSON,
                ],
            ],
        ];
    }

    public function actionTest(){
    	return json_encode(['test' => 'hahaha']);
    }
}