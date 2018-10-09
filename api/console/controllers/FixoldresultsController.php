<?php


namespace console\controllers;

use Yii;
use yii\base\ErrorException;
use yii\console\Controller;
use common\models\Games;
use common\models\Results;


class FixoldresultsController extends Controller
{
   
   public function actionResults()
    {
        $results = array();
        $grData = array();


        // get games by variant
        $gamesModel = new Games();
        $games = $gamesModel->getGames();

        if (false == $games) {
            throw new \yii\base\ErrorException("No games found...");
        }
        
        // get draw results from api
        foreach ($games as $game) {  
          
            $results = new Results(); 
            $result = $results->getAllResultsSpeficGame($game['id']);
            print_r($game['slug']);
            if($game['slug'] == 'euro_millions'){
                if(count($result) >0){
                for($cnt =0; $cnt < count($result); $cnt++){    
                        $dateTest = (date_format(date_create($result[$cnt]['draw_date']),'Y-m-d'));
                        //if($dateTest != '2017-12-14'){  
                        if($dateTest > '2018-08-07' && $dateTest < '2018-09-21'){                           
                        $returnVal =$this->actionGetDividendsEuroMillions(date_format(date_create($result[$cnt]['draw_date']),'d-m-Y'));
                        $resultUpdate = new Results();
                        $resultUpdate = $result[$cnt];
                        $resultUpdate->draw_date = $result[$cnt]['draw_date'];
                        $resultUpdate->current_jackpot = $returnVal['current_jackpot'];
                        $resultUpdate->stats = json_encode($returnVal['stats']);
                        $resultUpdate->update();
                    }
                }
               }
            }
            if($game['slug'] == 'thunderball'){
                if(count($result) >0){
                for($cnt =0; $cnt < count($result); $cnt++){   
                  $dateTest = (date_format(date_create($result[$cnt]['draw_date']),'Y-m-d'));
                        //if(($dateTest > '2017-03-21' && $dateTest < '2017-03-07') ||$dateTest > '2018-04-13' || $dateTest < '2018-03-07'){   
                        if($dateTest > '2018-08-31'){                     
                        $returnVal =$this->actionThunderBall(date_format(date_create($result[$cnt]['draw_date']),'Y-m-d'));
                        $resultUpdate = new Results();
                        $resultUpdate = $result[$cnt];
                        $resultUpdate->draw_date = $result[$cnt]['draw_date'];
                        $resultUpdate->current_jackpot = $returnVal['current_jackpot'];
                        $resultUpdate->stats = json_encode($returnVal['stats']);
                        $resultUpdate->draw_id = $returnVal['drawId'];
                        $resultUpdate->dividends = json_encode($returnVal['dividends']);
                        $resultUpdate->update();
                    }
                    }
               }
            }
            
            if($game['slug'] == 'lotto'){
                if(count($result) >0){
                for($cnt =0; $cnt < count($result); $cnt++){ 
                        $dateTest = (date_format(date_create($result[$cnt]['draw_date']),'Y-m-d'));
                        //if($dateTest != '2017-12-14'){  
                        if($dateTest > '2018-07-25'){                   
                              $returnVal =$this->actionLotto(date_format(date_create($result[$cnt]['draw_date']),'Y-m-d'));
                            $resultUpdate = new Results();
                            $resultUpdate = $result[$cnt];
                            $resultUpdate->draw_date = $result[$cnt]['draw_date'];
                            $resultUpdate->current_jackpot = $returnVal['current_jackpot'];
                            $resultUpdate->stats = json_encode($returnVal['stats']);
                            $resultUpdate->draw_id = $returnVal['drawId'];
                            $resultUpdate->dividends = json_encode($returnVal['dividends']);
                            $resultUpdate->update();
                        }
                    }
               }
            }
            
             if($game['slug'] == 'hotpicks'){
                if(count($result) >0){
                for($cnt =0; $cnt < count($result); $cnt++){  
                $dateTest = (date_format(date_create($result[$cnt]['draw_date']),'Y-m-d'));
                        //if($dateTest != '2017-12-14'){  
                        if($dateTest > '2018-07-25'){                             
                          $returnVal =$this->actionLottoHotpicks(date_format(date_create($result[$cnt]['draw_date']),'Y-m-d'));
                        $resultUpdate = new Results();
                        $resultUpdate = $result[$cnt];
                        $resultUpdate->draw_date = $result[$cnt]['draw_date'];
                        $resultUpdate->current_jackpot = $returnVal['current_jackpot'];
                        $resultUpdate->stats = json_encode($returnVal['stats']);
                        $resultUpdate->draw_id = $returnVal['drawId'];
                        $resultUpdate->dividends = json_encode($returnVal['dividends']);
                        $resultUpdate->update();
                    }
                }
               }
            }
        }
    }

    public function actionGetDividendsEuroMillions($path=''){
            //$returnValue = new stdClass();
        $fromSiteForVideo = file_get_contents('https://www.lottery.co.uk/euromillions/results-'.$path);   
            
            $firstExplodeForVideo = explode('<h2>Prize Breakdown</h2>', $fromSiteForVideo); 
                 
            $secondExplodeForVideo = explode('<br>', $firstExplodeForVideo[1]); 
    

            $dividends = preg_replace('/<tr(.*?)>/','<tr>', $secondExplodeForVideo[0]);

            $dividends = preg_replace('/[\x00-\x1F\x7F-\xFF]/', '', $dividends);
            $dividends = preg_replace('/<td(.*?)>/','<td>', $dividends);
            


            $rows = explode('</tr>',$dividends);
            $numRows = (count($rows));
            $actualRows = explode('<td>', $rows[count($rows)-2]);
          
            $winners = preg_replace('/[^0-9.]/', '',$actualRows[2]);
            $TotalAmount = preg_replace('/[^0-9.]/', '',$actualRows[4]);
            
            $AveragePrizeWon = round( $TotalAmount / $winners,1);
            $highestPrice = 0;
            $currentJackpot =0;
            $totalHigherWinners= 0;
            for($cnt =1;$cnt < ($numRows-3);$cnt++)
            {           
                //print_r($rows[$cnt]);  
                $actualRows = explode('<td>', $rows[$cnt]);
                $countWinner = preg_replace('/[^0-9.]/', '',$actualRows[2]);
                $pricePayment = preg_replace('/[^0-9.]/', '',$actualRows[3]);
                if($pricePayment > $highestPrice  && $countWinner > 0){
                    $highestPrice = $pricePayment;
                }
                if($pricePayment > $currentJackpot){
                    $currentJackpot = $pricePayment;
                }

                if($pricePayment > $AveragePrizeWon){
                    $totalHigherWinners +=$countWinner;
                }
            }
            $returnValue['dividends']['lotto_dividends'] = $dividends;
            $returnValue['stats']['AveragePrizeWon'] = $AveragePrizeWon;
            $returnValue['stats']['AboveAverageWins'] = (round((($totalHigherWinners/$winners)*100),2));
            $returnValue['stats']['LargestPrizeWon'] = $highestPrice;
            $returnValue['current_jackpot'] = $currentJackpot;           
            return $returnValue;
          
    }

    public function actionThunderBall($path=''){
        $fromSiteForVideo = file_get_contents('http://www.lotteryextreme.com/uk_national_lottery/thunderball-prize_breakdown('.$path.')');   
           
            $firstExplodeForVideo = explode('<br><br>', $fromSiteForVideo); 
           
            $dividends = preg_replace('/<tr(.*?)>/','<tr>', $firstExplodeForVideo[1]);

            $dividends = preg_replace('/<table(.*?)>/', '<table>', $dividends);
            $dividends = preg_replace('/<td(.*?)>/','<td>', $dividends);
           
            $rows = explode('</tr>', $dividends);
            $numRows = (count($rows));
            $actualRows = explode('<td>', $rows[count($rows)-2]);
            
            $winners = preg_replace('/[^0-9.]/', '',$actualRows[2]);            
           
            $TotalAmount = preg_replace('/&#163;/', '',$actualRows[4]);
            $TotalAmount = preg_replace('/[^0-9.]/', '',$TotalAmount);
            $AveragePrizeWon = round( ($TotalAmount / $winners),1);
            $currentJackpot = 0;
            $highestPrice = 0;
            $totalHigherWinners= 0;
            for($cnt =1;$cnt < ($numRows-3);$cnt++)
            {           
                
                $actualRows = explode('<td>', $rows[$cnt]);

                $pricePayment = preg_replace('/&#163;/', '',$actualRows[3]);
                $pricePayment = preg_replace('/[^0-9.]/', '',$pricePayment);
                $countWinner = preg_replace('/[^0-9.]/', '',$actualRows[2]);

                if($pricePayment > $highestPrice && $countWinner > 0){
                    $highestPrice = $pricePayment;
                }

                if($pricePayment > $AveragePrizeWon){
                    $totalHigherWinners +=$countWinner;
                }
            }
            $AboveAverageWin = round((($totalHigherWinners/$winners)*100),2);
            $LargestPrizeWon = $highestPrice;
            $AveragePrizeWon =  $AveragePrizeWon;  
          
            $date = date_format(date_create($path),'d-m-Y');

          $fromSiteForVideo = file_get_contents('https://www.lottery.co.uk/thunderball/results-'.$date); 
          
          $firstExplodeForVideo = explode('</ol>', $fromSiteForVideo); 
          
          $secondExplode = explode('<h2>Results</h2>', $firstExplodeForVideo[1]);
         
          $thirdExplode = explode('Thunderball', $secondExplode[0]);
          $draw = (preg_replace('/[^0-9]/', '', $thirdExplode[0]));
            $returnValue['dividends']['lotto_dividends'] = $dividends;
            $returnValue['stats']['AveragePrizeWon'] = $AveragePrizeWon;
            $returnValue['stats']['AboveAverageWins'] = (round((($totalHigherWinners/$winners)*100),2));
            $returnValue['stats']['LargestPrizeWon'] = $highestPrice;
            $returnValue['current_jackpot'] = '500000';
            $returnValue['drawId'] = $draw;

            return $returnValue;

    }

    public function actionLotto($path=''){
        $fromSiteForVideo = file_get_contents('http://www.lotteryextreme.com/uk_national_lottery/lotto-prize_breakdown('.$path.')');   
          
            $firstExplodeForVideo = explode('<br><br>', $fromSiteForVideo); 
             
            $dividends = preg_replace('/<tr(.*?)>/','<tr>', $firstExplodeForVideo[1]);

            $dividends = preg_replace('/<table(.*?)>/', '<table>', $dividends);
            $dividends = preg_replace('/<td(.*?)>/','<td>', $dividends);
               

            $rows = explode('</tr>', $dividends);
            $numRows = (count($rows));
            $actualRows = explode('<td>', $rows[count($rows)-2]);
            //print_r($actualRows);
            $winners = preg_replace('/[^0-9.]/', '',$actualRows[2]);            
           
            $TotalAmount = preg_replace('/&#163;/', '',$actualRows[4]);
            $TotalAmount = preg_replace('/[^0-9.]/', '',$TotalAmount);
            $AveragePrizeWon = round( ($TotalAmount / $winners),1);
            $currentJackpot = 0;
            $highestPrice = 0;
            $totalHigherWinners= 0;
            for($cnt =1;$cnt < ($numRows-3);$cnt++)
            {           
                
                $actualRows = explode('<td>', $rows[$cnt]);

                $pricePayment = preg_replace('/&#163;/', '',$actualRows[3]);
                $pricePayment = preg_replace('/[^0-9.]/', '',$pricePayment);
                $countWinner = preg_replace('/[^0-9.]/', '',$actualRows[2]);

                if($pricePayment > $highestPrice && $countWinner > 0){
                    $highestPrice = $pricePayment;
                }

                if($pricePayment > $AveragePrizeWon){
                    $totalHigherWinners +=$countWinner;
                }
            }
            $AboveAverageWin = round((($totalHigherWinners/$winners)*100),2);
            $LargestPrizeWon = $highestPrice;
            $AveragePrizeWon =  $AveragePrizeWon; 

        $date = date_format(date_create($path),'d-m-Y');
          $fromSiteForVideo = file_get_contents('https://www.lottery.co.uk/lotto/results-'.$date); 
         
          $firstExplodeForVideo = explode('</ol>', $fromSiteForVideo); 
          
          $secondExplode = explode('<h2>Results</h2>', $firstExplodeForVideo[1]);
        
          $thirdExplode = explode('Lotto', $secondExplode[0]);
          $draw = (preg_replace('/[^0-9]/', '', $thirdExplode[0]));

            

         $scrapre1Jackpot = explode('<h2>Prize Breakdown</h2>', $firstExplodeForVideo[1]);
          $scrapre2Jackpot = explode('<br>',$scrapre1Jackpot[1]);
          
          $table = explode('<tbody>',$scrapre2Jackpot[0]);
          $rows = explode('<tr>',  $table[1]);
         
          $td = explode('</td>', $rows[1]);

          $currentJackpot=  preg_replace('/[^0-9.]/', '',$td[2]);


            $returnValue['dividends']['lotto_dividends'] = $dividends;
            $returnValue['stats']['AveragePrizeWon'] = $AveragePrizeWon;
            $returnValue['stats']['AboveAverageWins'] = (round((($totalHigherWinners/$winners)*100),2));
            $returnValue['stats']['LargestPrizeWon'] = $highestPrice;            
            $returnValue['drawId'] = $draw;
            $returnValue['current_jackpot'] = $currentJackpot;

            return $returnValue;
    }


    public function actionLottoHotpicks($path=''){
        $fromSiteForVideo = file_get_contents('http://www.lotteryextreme.com/uk_national_lottery/Lotto_HotPicks-Prize_Breakdown('.$path.')');   
            
            $firstExplodeForVideo = explode('<br><br>', $fromSiteForVideo); 
            
            $dividends = preg_replace('/<tr(.*?)>/','<tr>', $firstExplodeForVideo[1]);

            $dividends = preg_replace('/<table(.*?)>/', '<table>', $dividends);
            $dividends = preg_replace('/<td(.*?)>/','<td>', $dividends);
                

            $rows = explode('</tr>', $dividends);
            $numRows = (count($rows));
            $actualRows = explode('<td>', $rows[count($rows)-2]);
            
            $winners = preg_replace('/[^0-9.]/', '',$actualRows[2]);            
           
            $TotalAmount = preg_replace('/&#163;/', '',$actualRows[4]);
            $TotalAmount = preg_replace('/[^0-9.]/', '',$TotalAmount);
            $AveragePrizeWon = round( ($TotalAmount / $winners),1);
            $currentJackpot = 0;
            $highestPrice = 0;
            $totalHigherWinners= 0;
            for($cnt =1;$cnt < ($numRows-3);$cnt++)
            {           
                
                $actualRows = explode('<td>', $rows[$cnt]);

                $pricePayment = preg_replace('/&#163;/', '',$actualRows[3]);
                $pricePayment = preg_replace('/[^0-9.]/', '',$pricePayment);
                $countWinner = preg_replace('/[^0-9.]/', '',$actualRows[2]);

                if($pricePayment > $highestPrice && $countWinner > 0){
                    $highestPrice = $pricePayment;
                }

                if($pricePayment > $AveragePrizeWon){
                    $totalHigherWinners +=$countWinner;
                }
            }
          $AboveAverageWin = round((($totalHigherWinners/$winners)*100),2);
          $LargestPrizeWon = $highestPrice;
          $AveragePrizeWon =  $AveragePrizeWon; 

        $date = date_format(date_create($path),'d-m-Y');
          $fromSiteForVideo = file_get_contents('https://www.lottery.co.uk/lotto/hotpicks/results-'.$date); 
          
          $firstExplodeForVideo = explode('</ol>', $fromSiteForVideo); 
         
          $secondExplode = explode('<h2>Results</h2>', $firstExplodeForVideo[1]);
         
          $thirdExplode = explode('Lotto HotPicks', $secondExplode[0]);
          $draw = (preg_replace('/[^0-9]/', '', $thirdExplode[0]));

            $currentJackpot = '350000';


            $returnValue['dividends']['lotto_dividends'] = $dividends;
            $returnValue['stats']['AveragePrizeWon'] = $AveragePrizeWon;
            $returnValue['stats']['AboveAverageWins'] = (round((($totalHigherWinners/$winners)*100),2));
            $returnValue['stats']['LargestPrizeWon'] = $highestPrice;            
            $returnValue['drawId'] = $draw;
            $returnValue['current_jackpot'] = $currentJackpot;

            return $returnValue;
    }

    public function actionGetpreviousresults(){

        $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'http://admin.kla.lan/api/get-draws');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json'                
            ));
            $data = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

            if ($httpCode < 200 || $httpCode >= 300) {
                throw new \yii\base\ErrorException("Error contacting API: " . curl_error($ch));
            }

            curl_close($ch);
            $oldData = json_decode($data);
            /*print_r(count($oldData->data));
            $resultsModel = new Results();
            $res = (object)array(); */       
            $toWrite ='';
            for($cnt =0; $cnt < count($oldData->data); $cnt++){
            //for($cnt =0; $cnt < 20; $cnt++){
                $resultsModel = new Results();
                $res = (object)array();         
                $res->draw_id = $oldData->data[$cnt]->draw_id;
                $res->draw_date = $oldData->data[$cnt]->draw_date;
                $res->game_id = $oldData->data[$cnt]->game_id;
                $res->main_numbers = json_encode($oldData->data[$cnt]->main_numbers);
                $res->supp_numbers = json_encode($oldData->data[$cnt]->supp_numbers);
                $res->dividends = json_encode($oldData->data[$cnt]->dividends);
                $res->next_jackpot = null;
            $res->current_jackpot = null;
            $res->video_link = null;
            $res->stats = null;
            $one = 'INSERT INTO results(draw_id, draw_date, game_id, main_numbers,supp_numbers,dividends)
VALUES ('. $res->draw_id.', "'.$res->draw_date.'", '.$res->game_id.',"'.$res->main_numbers.'","'.$res->supp_numbers.'","'.$res->dividends.'");'.PHP_EOL;
             

            file_put_contents('oldKLAuk.sql', $one, FILE_APPEND);
            $toWrite = $toWrite.$one.'\n';
                //print_r($toWrite);

                //$resultsModel->saveResult($res);
            }
            
            $newData = file_get_contents('oldKLAuk.sql');

            $newData = preg_replace('/""/','\'', $newData);
            file_put_contents('console/data/uk/newKLAuk.sql',$newData);
    }

    public function actionForfinaldata(){
        $results = new Results();
        for($cntGame =1;$cntGame < 11;$cntGame++){
            $result = $results->getAllResultsSpeficGame($cntGame);
            for($cnt =0; $cnt < count($result); $cnt++){
                $resultsModel = new Results();
                    $res = (object)array();         
                    $res->draw_id = $result[$cnt]->draw_id;
                    $res->draw_date = $result[$cnt]->draw_date;
                    $res->game_id = $result[$cnt]->game_id;
                    $res->main_numbers = ($result[$cnt]->main_numbers);
                    $res->supp_numbers =($result[$cnt]->supp_numbers);
                    $res->dividends = ($result[$cnt]->dividends);
                    
                    if($result[$cnt]->next_jackpot!= null){
                    $res->next_jackpot = $result[$cnt]->next_jackpot;
                    }else{
                        $res->next_jackpot = null;
                    }

                    $res->current_jackpot = $result[$cnt]->current_jackpot;
                    $res->video_link =  $result[$cnt]->video_link;
                    $res->stats = ($result[$cnt]->stats);

                    $res->powerball_numbers = json_encode($result[$cnt]->powerball_numbers);
                    $res->strike_numbers = json_encode($result[$cnt]->strike_numbers);

                $one = 'INSERT INTO results(draw_id, draw_date, game_id, main_numbers,supp_numbers,dividends,powerball_numbers,strike_numbers,current_jackpot,next_jackpot,video_link,stats)
                        VALUES ('. $res->draw_id.', \''.$res->draw_date.'\', \''.$res->game_id.'\',\''.$res->main_numbers.'\',\''.$res->supp_numbers.'\',\''.$res->dividends.'\',\''.$res->powerball_numbers.'\',\''.$res->strike_numbers.'\',\''.$res->current_jackpot.'\',\''.$res->next_jackpot.'\',\''.$res->video_link.'\',\''.$res->stats.'\');'.PHP_EOL;   
                file_put_contents('FinalKLAuk.sql', $one, FILE_APPEND);
        }            
        }

        $fileToWrite = file_get_contents('FinalKLAuk.sql');
        //$fileToWrite = preg_replace('/""/','\'', $fileToWrite);
        file_put_contents('console/data/uk/FinalValues.sql',$fileToWrite);

    }

    
    
    
}
