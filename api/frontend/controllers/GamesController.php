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
                ],/*
                'corsFilter' => [
                    'class' => \yii\filters\Cors::className(),
                    'cors' => [
                        // restrict access to
                        'Origin' => ['*'],
                        // Allow only POST and PUT methods
                        'Access-Control-Request-Method' => ['POST', 'PUT', 'GET'],
                        // Allow only headers 'X-Wsse'
                        'Access-Control-Request-Headers' => ['X-Wsse'],
                        // Allow credentials (cookies, authorization headers, etc.) to be exposed to the browser
                        'Access-Control-Allow-Credentials' => true,
                        // Allow OPTIONS caching
                        'Access-Control-Max-Age' => 3600,
                        // Allow the X-Pagination-Current-Page header to be exposed to the browser.
                        'Access-Control-Expose-Headers' => ['X-Pagination-Current-Page'],
                    ],

                ],*/
            ],

        ];
    }

    public function actionTest(){
    	return json_encode(['test' => 'hahaha']);
    }
}