<?php

namespace frontend\controllers;

use \yii\web\Response;
use yii\rest\ActiveController;
use common\models\Results;
use common\models\Games;

class ResultsController extends ActiveController
{
    public $modelClass = 'common\models\Results';

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

    public function actionFetchbygameanddrawid($game_slug, $draw_id){
        return Games::find()->joinWith(['results' => function($query) use ($draw_id){
            $query->where(['results.draw_id' => $draw_id]);
        }])
        ->where(['games.slug'=>$game_slug])
        ->asArray()->all();
    }
}