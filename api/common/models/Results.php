<?php

namespace common\models;

use Yii;
use yii\data\ActiveDataProvider;
use common\models\Games;
use yii\db\Query;

/**
 * This is the model class for table "results".
 *
 * @property integer $id
 * @property integer $game_id
 * @property integer $draw_id
 * @property string $draw_date
 * @property string $main_numbers
 * @property string $supp_numbers
 * @property string $dividends
 *
 * @property Games $game
 */
class Results extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'results';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['game_id', 'draw_id'], 'integer'],
            [['draw_date'], 'required'],
            [['dividends'], 'string'],
            [['video_link'], 'string'],
            [['next_jackpot'], 'string'],
            [['current_jackpot'], 'string'],
            [['draw_date'], 'string', 'max' => 50],
            [['main_numbers'], 'string'],
            [['supp_numbers'], 'string', 'max' => 100],
            [['game_id'], 'exist', 'skipOnError' => true, 'targetClass' => Games::className(), 'targetAttribute' => ['game_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'game_id' => 'Game ID',
            'draw_id' => 'Draw ID',
            'draw_date' => 'Draw Date',
            'main_numbers' => 'Main Numbers',
            'supp_numbers' => 'Supp Numbers',
            'dividends' => 'Dividends',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getGame()
    {
        return $this->hasOne(Games::className(), ['id' => 'game_id']);
    }

    public function search($params) {
        $this->load($params);
         $qry = self::find();
        $qry = $qry->joinWith('game');
        $qry->andFilterWhere(['like', 'game_id', $this->game_id]);
        $qry->andFilterWhere(['ilike', 'draw_id', $this->draw_id]);
        $qry->andFilterWhere(['draw_date' => $this->draw_date]);
         if (!empty($params['Games'])) {
            $qry->andFilterWhere(['ilike', 'games.name', $params['Games']['name']]);
        }
         $data_provider = new ActiveDataProvider([
            'query' => $qry->orderBy('draw_date desc')
        ]);
         return $data_provider;
    }
     public function findLastDrawId($game) {
        return Results::find()->joinWith('game')->where(['results.game_id' => 3, 'games.slug' => str_replace('-', '_', $game)])->min('results.draw_id');
    }
     /**
     * Returns the latest result from the database (may or may not be a displayed game)
     *
     * @return array|null|\yii\db\ActiveRecord
     */
    public static function findLatestResult() {
        return Results::find()->joinWith('game')->where('main_numbers is not null')->orderBy('draw_date desc, game_id asc')->one();
    }
     public static function findLatestResultOfGame($fields) {
        return Results::find()->where($_GET)->orderBy(['draw_date'=>SORT_DESC])->limit(1);
    }
     public static function findLatestResultOfSpecificGame($fields) {
        return Results::find()->joinWith('game')->where($fields)->andWhere('results.main_numbers is not null')->orderBy(['draw_date'=>SORT_DESC])->limit(1);
    }
     /**
     * Returns the latest result that should be shown on the site
     *
     * @return array|null|\yii\db\ActiveRecord
     */
    public static function findLatestDisplayResult() {
        return Results::find()->joinWith('game')->where('results.main_numbers is not null')->andWhere('games.priority is not null')->orderBy('results.draw_date desc, games.priority asc')->one();
    }
     public function saveResult($data)
    {
        echo "Draw id: " . $data->draw_id;
        if (count($data) > 0) {
            $results = self::find()->where(['game_id' => $data->game_id, 'draw_id' => $data->draw_id])->one();
            if (!$results) {
                $results = new Results();
            }
             $results->game_id = $data->game_id;
            $results->draw_id = $data->draw_id;
            $results->draw_date = $data->draw_date;
            $results->main_numbers = $data->main_numbers;
            $results->supp_numbers = $data->supp_numbers;
            $results->dividends = $data->dividends;
            $results->next_jackpot = $data->next_jackpot;
            $results->current_jackpot = $data->current_jackpot;
            $results->video_link = $data->video_link;
            $results->stats = $data->stats;
            //check for additional fields -- this is currently applicable for NZ Lotto/Powerball game
            if (isset($data->powerball_numbers)) {
                $results->powerball_numbers = $data->powerball_numbers;
            }
             if (isset($data->strike_numbers)) {
                $results->strike_numbers = $data->strike_numbers;
            }
             if ($results->save()) {
                echo ".... saved\n\n";
            } else {
                echo ".... not saved\n\n";
            }
        }
    }
     public function getResults($gameSlug = '')
    {
        $connection = Yii::$app->getDb();
        $query = "SELECT games.slug,
                     MAX(games.name) AS name,
                     MAX(results.draw_id) AS draw_number,
                     MAX(results.id) AS id,
                     results.game_id AS game_id,
                     MAX(results.draw_date) AS draw_date
                     FROM (
                       SELECT DISTINCT ON (id) id, draw_id, game_id, draw_date FROM results WHERE results.main_numbers is not null) results
                     LEFT JOIN games ON (results.game_id = games.id)  GROUP BY game_id, slug ORDER BY game_id ASC";
         $command = $connection->createCommand($query)->cache(60);
        return $command->queryAll();
    }
    public function getAllResults() {
        return Results::find()->with('game')->where('main_numbers is not null')->orderBy('draw_date desc')->all();
    }

    public function getAllResultsSpeficGame($game='') {
        return Results::find()->where('main_numbers is not null')->andWhere(['game_id' =>$game])->orderBy('draw_date asc')->all();
    }
     public function getResultDetails($where = array(), $fields = array())
    {
        if (!empty($where)) {
            $model = new Results();
             if (!empty($fields)) {
                return $model->find()->select($fields)->where($where)->one();
            } else {
                return $model->find()->where($where)->orderBy(['draw_date' => SORT_DESC])->one();
            }
        }
         return false;
    }
     private function isExists($slug, $draw_id)
    {
        $connection = Yii::$app->getDb();
        $query = "SELECT results.id from results LEFT JOIN games ON (results.game_id = games.id) WHERE games.slug = '{$slug}' AND results.draw_id={$draw_id}";
        $command = $connection->createCommand($query);
        $result = $command->queryAll();
        return !empty($result) ? true : false;
    }
     public static function getResultsForLastMonth($months = 1)
    {
        $connection = Yii::$app->getDb();
         $query = "SELECT * FROM results AS results INNER JOIN games AS games on games.id = results.game_id WHERE draw_date::date > (CURRENT_DATE - INTERVAL '$months month') AND games.variant = '" . Yii::$app->Settings->getVariant() . "' and main_numbers is not null ORDER BY draw_date DESC";
        $command = $connection->createCommand($query);
        $result = $command->queryAll();
         return $result;
    }
     public static function getUpcomingDraws($withGame = false) {
        $result = Results::find();
         if ($withGame) {
            $result = $result->with('game');
        }
         return $result->where('main_numbers is null')->orderBy('draw_date asc')->all();
    }
     public function getMainNumberString($seperator = ',') {
        $nums = json_decode($this->main_numbers, true);
        if (count($nums) > 1) {
            $type = $nums['type'];
            unset($nums['type']);
            return $type .' '. implode($seperator, $nums) . '.';
        }
        return '';
    }
     public function getSuppNumberString($seperator = ',') {
        $nums = json_decode($this->supp_numbers, true);
        if (count($nums) > 1) {
            $type = $nums['type'];
            unset($nums['type']);
            return $type . ' ' . implode($seperator, $nums) . '.';
        }
        return '';
    }
     public function getUrlItems() {
        $query = new Query();
         return $query->select(['results.id','results.game_id','results.draw_id','games.slug'])
                ->from('results')->leftJoin('games', 'games.id = results.game_id')
                ->orderBy(['results.id' => SORT_DESC])
                ->all();
    }
     public function getDraw($id = '', $draw = '') {
        return Results::find()->where(['game_id' => $id, 'draw_id' => $draw])->one();
    }
     public function getResultRange($game, $where = [], $fields = [])
    {
        if (!empty($where)) {
            $model = new Results();
             if (!empty($fields)) {
                return $model->find()->joinWith('game')->select($fields)->where($where)->andWhere(['games.slug' => $game])->all();
            } else {
                return $model->find()->joinWith('game')->where($where)->andWhere(['games.slug' => $game])->orderBy(['draw_date' => SORT_DESC])->all();
            }
        }
         return false;
    }

    public function getPreviousResultId($game_id = null, $draw_id = null)
    {
        $query = Results::find()->where(['game_id' => $game_id])->andWhere(['<', 'draw_id', $draw_id])->orderBy(['draw_id' => SORT_DESC])->one();

        // sets to current draw if there's no previous draw
        if (!isset($query['draw_id'])) {
            $query['draw_id'] = $draw_id;
            $query = (object)$query;
        }

        return $query->draw_id;
    }

    public function getNextResultId($game_id = null, $draw_id = null){
        $query = Results::find()->where(['game_id' => $game_id])->andWhere(['>', 'draw_id', $draw_id])->orderBy(['draw_id' => SORT_ASC])->one();

        // sets to current draw if there's no previous draw
        if (!isset($query['draw_id'])) {
            $query['draw_id'] = $draw_id;
            $query = (object)$query;
        }

        return $query->draw_id;
    }   
    
}
