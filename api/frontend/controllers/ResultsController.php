<?php

namespace frontend\controllers;

use Yii;
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
        $game = Games::find()->joinWith(['results' => function($query) use ($draw_id){
            $query->where(['results.draw_id' => $draw_id]);
        }])
        ->where(['games.slug'=>$game_slug])->asArray()->one();

        if( $game ){
            $game['prev_draw'] = Games::getPreviousResultId($game['id'], $game['results'][0]['draw_id']);
            $game['next_draw'] = Games::getNextResultId($game['id'], $game['results'][0]['draw_id']);
        }

        return $game;
    }

    public function actionFetchbygame($game_slug){
        $game = Games::find()->joinWith(['results' => function($query){
            $query->orderBy(['results.draw_date' => SORT_DESC])->limit(1);
        }])
        ->where(['games.slug'=>$game_slug])
        ->asArray()->one();
        
        if( $game ){
            $game['prev_draw'] = Games::getPreviousResultId($game['id'], $game['results'][0]['draw_id']);
            $game['next_draw'] = Games::getNextResultId($game['id'], $game['results'][0]['draw_id']);
        }

        return $game;
    }

    public function actionSearch($game_slug, $search_data = null){
        $search_data = json_decode($search_data);

        $data = Games::find()->joinWith(['results' => function($query) use ($search_data){
            $query->orderBy(['results.draw_date' => SORT_DESC]);
            if( trim($search_data->search_number) != "" )
                $query->orWhere(['draw_id' => $search_data->search_number]);
            if( trim($search_data->search_date) )
                $query->orWhere(['draw_date' => $search_data->search_date]);
        }])
        ->where(['games.slug'=> $game_slug])
        ->asArray()->one();

        return $data ? $data : ['type' => 'fail', 'message' => 'No Result Found.'];
    }

    /* export by date range */
    public function actionExportresults(){
        $slug = null;
        if (isset($_GET['game'])) {
            $slug = $_GET['game'];
            unset($_GET['game']);
        }

        foreach ($_GET as $key => $value) {
            $errors = [];
            if ( empty($value) ) {
                $errors[] = "Please specify ".$key." value."; 
            }
            if( !empty($errors) )
                throw new \yii\web\HttpException(500, 'Invalid attribute:' . json_encode($errors));
        }

        try {
            $toExports = null;
            $filename = null;
            $results = new Results();

            if( isset($_GET['draw_id']) ){
                $toExports = $results->getResultRange($slug, ['=', 'draw_id', $_GET["draw_id"]]);
                $filename = $slug.'_draw-'.$_GET["draw_id"].'.csv';
            }
            else{
                $toExports = $results->getResultRange($slug, ['between', 'draw_date', $_GET["draw_date"], $_GET["draw_date_to"] ]);
                $filename = $slug.'_'.$_GET["draw_date"].'_'.$_GET["draw_date_to"].'.csv';
            }

            $this->arrayToCsvDownload($toExports, $filename, ',');

        } catch (Exception $ex) {
            throw new \yii\web\HttpException(500, 'Internal server error');
        }
    }

    private function arrayToCsvDownload($toExports, $filename = "export.csv", $delimiter=";") {
        $variant = Yii::$app->Settings->getVariant();
        $export = [];
        $export[] = ['GAME', 'DRAW ID', 'DRAW DATE', 'MAIN NUMBERS', 'SUPP'];
        foreach($toExports as $row){
            $main = '';
            $supp = '';

            $mainNumbers = json_decode($row->main_numbers);
            $suppNumbers = json_decode($row->supp_numbers);
            $powerball_numbers = [];
            $strike_numbers = [];

            if ($variant == 'nz' && $row->slug == 'lotto') {
                if (isset($row->powerball_numbers)) {
                    $powerball_numbers = json_decode($row->powerball_numbers);
                }

                if (isset($row->strike_numbers)) {
                    $strike_numbers = json_decode($row->strike_numbers);
                }
            }

            foreach ($mainNumbers as $key => $value){
                if ($key != 'type' && $value != '' && is_numeric( $value ))
                    $main .= $value.' ';
                
            }

            $isGlucksspirale = (Yii::$app->Settings->getVariant() == 'de' && $game['slug'] == 'glucksspirale') ? true : false;
            if ($isGlucksspirale){
                if (count($suppNumbers) > 0){
                    if (!is_null($suppNumbers) && $suppNumbers != '') {
                        foreach ($suppNumbers as $key => $value){
                            if ($key != 'type' && $value != ''){
                                $supp .= $value.' ';
                            }
                        }
                    }
                }
            }
            else{ // not sure if needs to put else here.
                if (count($suppNumbers) > 0){
                    if (!is_null($suppNumbers) && $suppNumbers != ''){
                        foreach ($suppNumbers as $key => $value){
                            if ($key !== 'type' && $value != '')
                                $supp .= $value.' ';
                        }
                    }
                }
                if (count($powerball_numbers) > 0){
                    foreach ($powerball_numbers as $key => $value){
                        $supp .= $value.' ';
                    }
                }
                if (count($strike_numbers) > 0){
                    foreach ($strike_numbers as $key => $value)
                        $supp .= $value.' ';
                }
            }

            $data = [
                $row->game->slug,
                $row->draw_id,
                date('l d M Y', strtotime($row->draw_date)),
                $main,
                $supp,
            ];

            $export[] = $data;
        }

        if( count($export) > 1 ){
            header('Content-Type: application/csv');
            header('Content-Disposition: attachment; filename="'.$filename.'";');

            // open the "output" stream
            // see http://www.php.net/manual/en/wrappers.php.php#refsect2-wrappers.php-unknown-unknown-unknown-descriptioq
            $f = fopen('php://output', 'w');

            foreach ($export as $line) {
                fputcsv($f, $line, $delimiter);
            }
        }
        else{
            throw new \yii\web\HttpException(500, 'No results found.');   
        }
        
    }
}