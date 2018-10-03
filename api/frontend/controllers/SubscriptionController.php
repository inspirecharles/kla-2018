<?php

namespace frontend\controllers;

use \yii\web\Response;
use yii\rest\ActiveController;
use common\models\Emails;


class SubscriptionController extends ActiveController
{
    public $modelClass = 'common\models\Emails';

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

    public function actionSaveemail($email=''){
        $model = new Emails();
        $exist = $model->find()->where(['email' => $email])->one();
        
        $models = new Emails();
        if($exist == null){           
                $models->email = $email;
                  if($models->save()){               
                        return ['status' => 'success', 'message' => 'with feat_img'];
                    }else{
                        return ['status' => 'fail', 'message' => 'Already Exist'];
                    }       
            
        }else{
             return ['status' => 'fail', 'message' => 'Already Exist'];
        }
    }
}