<?php

namespace frontend\controllers;

use Yii;
use \yii\web\Response;
use yii\rest\ActiveController;
use yii\web\UploadedFile;
use common\models\News;
use common\models\UploadForm;

class NewsController extends ActiveController
{
    public $modelClass = 'common\models\News';

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

    public function formName()
    {
        return '';
    }

    public function actions() 
    { 
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        return $actions;
    }

    public function prepareDataProvider() 
    {
        $searchModel = new News();    
        return $searchModel->search(\Yii::$app->request->queryParams);
    }

    public function beforeAction($action)
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;
        return parent::beforeAction($action);
    }

    public function actionGetallnews(){
        return News::find()->orderBy(['date_submitted' => SORT_DESC])->all();
    }

    public function actionGetbyslug($slug){
        $model = new News();
        return $model->find()->where(['slug' => $slug])->one();
    }

    public function actionAddsubmit(){
        $model = new News();
        //return Yii::$app->request->post('article');
        if ($model->load(['News' => Yii::$app->request->post()])) {
            $uploadModel = new UploadForm;
            $uploadModel->file = UploadedFile::getInstanceByName('feat_img');

            //$model->author_id = Yii::$app->user->id;
            $model->yr_month = date('Y m');
            $model->tags = strtolower($model->tags);
            $strSlug = preg_replace('/[^A-Za-z0-9\-\'\ ]/', '', $model->title); 
            $sr = array("   ", "  ", " ");
            $model->slug = strtolower(str_replace($sr, "-", $strSlug ));
            
            if($model->save()){
                if ($uploadModel->file && $uploadModel->validate()){
                    $file_path = Yii::getAlias('@uploadFolder').'/news/'. $model->id;
                    if( !file_exists($file_path) )
                        mkdir($file_path);

                    if( !file_exists( $file_path .'/'. $uploadModel->file->baseName . '.' . $uploadModel->file->extension ) )
                        $uploadModel->file->saveAs($file_path .'/'. $uploadModel->file->baseName . '.' . $uploadModel->file->extension );

                    $model->feat_img = $uploadModel->file->baseName . '.' . $uploadModel->file->extension;
                    $model->save();

                    return ['type' => 'success', 'message' => 'with feat_img'];
                }else{
                    return ['type' => 'success', 'message' => 'no feat_img'];
                }       
            }
            else
                return ['type' => 'fail', 'message' => 'error saving model'];
        }
        else
                return ['type' => 'fail', 'message' => 'cant load model'];
    }

    public function actionUpdatesubmit(){
        $model = News::find()->where(['id' => Yii::$app->request->post('id')])->one();
        if ($model->load(['News' => Yii::$app->request->post()])) {
            $uploadModel = new UploadForm;
            $uploadModel->file = UploadedFile::getInstanceByName('feat_img');

            $model->yr_month = date('Y m');
            $model->tags = strtolower($model->tags);
            $strSlug = preg_replace('/[^A-Za-z0-9\-\'\ ]/', '', $model->title); 
            $sr = array("   ", "  ", " ");
            $model->slug = strtolower(str_replace($sr, "-", $strSlug ));
            
            if ($uploadModel->file && $uploadModel->validate()){
                $file_path = Yii::getAlias('@uploadFolder').'/news/'. $model->id;
                if( !file_exists($file_path) )
                    mkdir($file_path);

                if( !file_exists( $file_path .'/'. $uploadModel->file->baseName . '.' . $uploadModel->file->extension ) )
                    $uploadModel->file->saveAs($file_path .'/'. $uploadModel->file->baseName . '.' . $uploadModel->file->extension );

                $model->feat_img = $uploadModel->file->baseName . '.' . $uploadModel->file->extension;
                $model->save();
                return ['type' => 'success', 'message' => 'with feat_img'];
            }else{
                $model->save();
                return ['type' => 'success', 'message' => 'no feat_img'];
            }
        }
        else
                return ['type' => 'fail', 'message' => 'cant load model'];
    }

    public function actionDeletenews()
    {
        $model = News::find()->where(['id' => Yii::$app->request->post('id')])->one();
        if( $model->delete() )
            return ['type' => 'success', 'message' => 'News deleted successfully.'];
        else
            return ['type' => 'fail', 'message' => 'Something went wrong.'];
    }
}
