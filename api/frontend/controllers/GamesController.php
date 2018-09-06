<?php

namespace frontend\controllers;

use \yii\web\Response;
use yii\rest\ActiveController;
use common\models\Games;

class GamesController extends ActiveController
{
    public $modelClass = 'common\models\Games';

   	public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
                'cors' => [
                    'Origin' => ['*'],
                    'Access-Control-Request-Method' => ['POST', 'PUT', 'GET'],
                    'Access-Control-Allow-Credentials' => true,
                    'Access-Control-Max-Age' => 3600
                ],

            ],
        ];
    }

    public function beforeAction($action)
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;
        return parent::beforeAction($action);
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

    public function actionHomedata(){
        $games = Games::find()->joinWith(['results'=>function($query){
            $query->orderBy(['results.draw_date' => SORT_DESC])->groupBy('results.game_id');
        }])->orderBy([
            'games.priority' => SORT_ASC,
            'results.draw_date' => SORT_DESC
        ])->asArray()->all();
        return $games;
    }
}