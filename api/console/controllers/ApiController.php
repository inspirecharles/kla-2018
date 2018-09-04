<?php
namespace console\controllers;

use Yii;
use yii\base\ErrorException;
use yii\console\Controller;
use common\models\Games;
use common\models\Results;

class ApiController extends Controller
{

    private $results = [];

    public function actionIndex()
    {
        echo "api running \n\n";
    }

    public function actionGames()
    {
        $games = array();
        //todo change this to get the games from the API for the variant
        try {
            $games = Yii::$app->api->getGames();

            // save games
            $gamesModel = new Games();
            $gamesModel->saveGame(json_decode($games));
        } catch (yii\Exception $e) {
            echo $e->getMessage();
            echo $e->getTraceAsString();
        }
    }

    public function actionUpcoming()
    {
        echo str_pad('', 50, '*') . "\n";
        echo "* Fetching upcoming draws...\n";
        echo "* Started:  ".date('F jS Y') . "\n";
        echo str_pad('', 50, '*') . "\n";

        try {
            $draws = json_decode(Yii::$app->api->getUpcomingDraws());
            foreach ($draws->Data as $upcoming_game) {
                $game = Games::find()->where(['slug' => $upcoming_game->Game->Slug])->one();

                if (!$game) {
                    echo "Skipping game slug $upcoming_game->Game->Slug as this game is not supported\n";
                    continue;
                }

                $draw = Results::find()->where(['game_id' => $game->id, 'draw_id' => $upcoming_game->DrawNumber])->one();

                if ($draw) {
                    //skip the draw if we have
                    continue;
                }

                $draw = new Results();
                $draw->draw_id = $upcoming_game->DrawNumber;
                $draw->game_id = $game->id;
                $draw->draw_date = $upcoming_game->DrawDate;

                if ($draw->save()) {
                    echo "Added $upcoming_game->DrawNumber for $game->slug\n";
                }

            }
            echo "Finished fetching upcoming draws\n";
        } catch (\yii\base\Exception $e) {
            echo "Exception thrown - not processing any other upcoming draws.\n";
            echo $e->getMessage() . "\n";
            echo $e->getTraceAsString();

        }
    }

    public function actionResults()
    {
        $results = array();
        $grData = array();

        echo str_pad('', 50, '*') . "\n";
        echo "* Parsing game results...\n";
        echo "* Started:  ".date('F jS Y') . "\n";
        echo str_pad('', 50, '*') . "\n";

        // get games by variant
        $gamesModel = new Games();
        $games = $gamesModel->getGames();

        if (false == $games) {
            throw new \yii\base\ErrorException("No games found...");
        }
 
        // get draw results from api
        foreach ($games as $game) {           
            $gr = Yii::$app->api->getDraws($game['slug']);
            $gr = json_decode($gr);

            // parse game result data
            $this->parseGameResult($gr, $game);

            echo "Parsing {$game['name']} game results completed!\n\n";
        }
    }

    private function parseGameResult($gr, $game)
    {
        $resultsModel = new Results();
        $data = (object)array();
        if (count($gr->Data) > 0) {
            foreach ($gr->Data as $key => $grData) {  //loop on the container object
                $data->game_id = $game['id'];
                $data->draw_date = date('Y-m-d', strtotime($grData->DrawDate));
                $data->draw_id = $grData->DrawNumber;
                $data->slug = $game['slug'];
                if (count($grData->Results) > 0 && isset($grData->Results->results)) {

                    $dr = $grData->Results->results;
                    $mainNum = $dr->numbers->numbers_1;
                    $suppNum = $dr->numbers->numbers_2;

                    $data->main_numbers = json_encode($mainNum);
                    $data->supp_numbers = json_encode($suppNum);
                    $data->dividends = json_encode($dr->dividends);

                    //check for additional fields -- this is currently applicable for NZ Lotto/Powerball game
                    if (isset($dr->numbers->powerball_number)) {
                        $data->powerball_numbers = json_encode( (object) $dr->numbers->powerball_number);
                    }

                    if (isset($dr->numbers->strike_numbers)) {
                        $data->strike_numbers = json_encode( (object) $dr->numbers->strike_numbers);
                    }

                    // save to db - if we have all the datas
                    $resultsModel->saveResult($data);

                    // save all game results to one cache item
                    $this->results[$game['slug']] = $data;
                }
            }

            // check if results cache data exists
            // if yes, update the cache data
            if (Yii::$app->cache->exists('results')) {
                // flush the existing data first
                Yii::$app->cache->flush();
                // save to cache for 10 mins
                Yii::$app->cache->set('results', $this->results, 36000);
            }
        }
    }

    public function actionClearCache()
    {
        echo "Clearing cache data...\n\n";
        Yii::$app->cache->flush();
        echo "Cache data cleared!\n\n";
    }
}

?>

