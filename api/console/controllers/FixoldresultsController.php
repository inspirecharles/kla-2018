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

        	if($game['slug'] == 'euro_millions'){
                if(count($result) >0){
        		for($cnt =0; $cnt < count($result); $cnt++){                       
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
            if($game['slug'] == 'thunderball'){
                if(count($result) >0){
                for($cnt =0; $cnt < count($result); $cnt++){                       
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

            if($game['slug'] == 'lotto'){
                if(count($result) >0){
                for($cnt =0; $cnt < count($result); $cnt++){                       
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
            
             if($game['slug'] == 'hotpicks'){
                if(count($result) >0){
                for($cnt =0; $cnt < count($result); $cnt++){                       
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
            echo $AboveAverageWin = round((($totalHigherWinners/$winners)*100),2);
            echo $LargestPrizeWon = $highestPrice;
            echo $AveragePrizeWon =  $AveragePrizeWon; 

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
    
    
}
