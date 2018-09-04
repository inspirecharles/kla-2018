<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;
use yii\data\ActiveDataProvider;
use common\models\Games;

class Games extends ActiveRecord
{


    /**
     * @return string the name of the table associated with this ActiveRecord class.
     */
    public static function tableName()
    {
        return 'games';
    }

    public function rules()
    {
        return [
            [['name', 'slug'], 'required'],
            [['name'], 'string', 'max' => 45],
            [['slug'], 'string', 'max' => 45],
            [['slug'], 'unique'],
            [['priority'], 'integer', 'integerOnly' => true]
        ];
    }

    public function getResults()
    {
        return $this->hasMany(Results::className(), ['game_id' => 'id']);
    }

    public function saveGame($data = array())
    {
        if (count($data) > 0) {
            foreach ($data as $key => $d) {
                $games = new Games();
                 if (!$this->isExists(array('slug' => $d['slug'], 'variant' =>  Yii::$app->Settings->getVariant()))) {
                    $games->name = $d['name'];
                    $games->slug = $d['slug'];
                    $games->variant = Yii::$app->Settings->getVariant();
                     $games->save();
                }
            }
        }
    }
     public function search($params)
    {
        $this->load($params);
         $qry = self::find();
        $qry->andFilterWhere(['ilike', 'name', $this->name]);
        $qry->andFilterWhere(['ilike', 'slug', $this->slug]);
         $data_provider = new ActiveDataProvider([
            'query' => $qry->orderBy('priority asc')
        ]);
         return $data_provider;
    }
     public function getSeo()
    {
        return $this->hasOne(Seo::className(), ['game' => 'slug']);
    }

    public function firstResult(){
        return Results::find()->where(['game_id' => $this->id])->andWhere('main_numbers is not null')->orderBy('draw_date asc')->one();    
    }
     public function latestResults($draw = false)
    {
        $qry = Results::find()->where(['game_id' => $this->id])->andWhere('main_numbers is not null');
        if ($draw) {
            $qry = $qry->andWhere(['draw_id' => $draw]);
        }
         return $qry->orderBy('draw_date desc')->one();
      
    }
     public static function getDisplayedGames()
    {
        $result = Games::getDb()->cache(function ($db) {
            return Games::find()->where(['variant' => Yii::$app->Settings->getVariant()])->andWhere('priority is not null')->orderBy('priority asc')->all();
        }, 60);
         return $result;
    }
     public function getGame($game = "")
    {
        return Games::find()->where(['slug' => str_replace('-', '_', $game)])->andWhere('priority is not null')->one();
    }
     public function getGames()
    {
        return Games::find()->where(['variant' =>  Yii::$app->Settings->getVariant()])->orderBy('priority asc')->all();
        /*
        $result = Games::getDb()->cache(function ($db) {
            return Games::find()->where(['variant' => Yii::$app->Settings->getVariant()])->all();
        }, 900); //cache game lookups for 15 minutes
         return $result;
        */
    }
     public function getGameId($slug = '')
    {
        $result = Games::getDb()->cache(function ($db) use ($slug) {
            return Games::find()->select('id')->where(['slug' => $slug])->one();
        }, 900);
         return $result;
    }
     private function isExists($where)
    {
        return Games::find()->where($where)->exists();
    }
     public function getPreviousResultId($game_id, $draw_id)
    {
        $query = Results::find()->where(['game_id' => $game_id])->andWhere(['<', 'draw_id', $draw_id])->orderBy(['draw_id' => SORT_DESC])->one();
         // sets to current draw if there's no previous draw
        if (!isset($query['draw_id'])) {
            $query['draw_id'] = $draw_id;
            $query = (object)$query;
        }
         return $query->draw_id;
    }
     public function getNextResultId($game_id, $draw_id){
        $query = Results::find()->where(['game_id' => $game_id])->andWhere(['>', 'draw_id', $draw_id])->orderBy(['draw_id' => SORT_ASC])->one();
         // sets to current draw if there's no previous draw
        if (!isset($query['draw_id'])) {
            $query['draw_id'] = $draw_id;
            $query = (object)$query;
        }
         return $query->draw_id;
    }
}
