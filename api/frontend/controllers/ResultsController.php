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
        ->asArray()->one();
    }

    public function actionFetchbygame($game_slug){
        return Games::find()->joinWith(['results' => function($query){
            $query->orderBy(['results.draw_date' => SORT_DESC])->limit(1);
        }])
        ->where(['games.slug'=>$game_slug])
        ->asArray()->one();
    }

    public function actionSearch($game_slug, $search_data = null){
        $search_data = json_decode($search_data);

        return Games::find()->joinWith(['results' => function($query) use ($search_data){
            $query->orderBy(['results.draw_date' => SORT_DESC]);
            if( trim($search_data->search_number) != "" )
                $query->orWhere(['draw_id' => $search_data->search_number]);
            if( trim($search_data->search_date) )
                $query->orWhere(['draw_date' => $search_data->search_date]);
        }])
        ->where(['games.slug'=> $game_slug])
        ->asArray()->one();
    }
}