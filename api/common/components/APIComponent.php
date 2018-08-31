<?php
namespace common\components;

use Yii;
use yii\base\Component;
use yii\base\InvalidConfigException;
use yii\web\BadRequestHttpException;

class ApiComponent extends Component
{
    // Country variant
    private $variant = '';

    // API Base URL
    private $apiBaseURL = '';

    // API full URL
    private $apiURL = '';

    // API current working version
    private $apiVersion = 'v1';

    // API Token
    private $apiToken = '';

    // API Token Type
    private $apiTokenType = '';

    public function __construct($config = [])
    {
        $this->variant = Yii::$app->Settings->getVariant();
        $this->apiBaseURL = Yii::$app->params['results-api-base'];

        $this->getToken();
        parent::__construct($config);
    }

    /**
     * Sets the token to be used with each API request.  Throws yii\base\ErrorException if it does not receive one
     */
    private function getToken() {
        echo "Getting API Token \n";

        $post_data = ['secret' => Yii::$app->Settings->getResultsAPIsecret(), 'key' => Yii::$app->Settings->getResultsAPIkey()];
        $post_data = json_encode($post_data);

        $apiUrl = $this->apiBaseURL . '/' . $this->apiVersion . '/token';

        // cURL process
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($post_data)

        ));
        $data = json_decode(curl_exec($ch));

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($httpCode < 200 || $httpCode >= 300) {
            throw new \yii\base\ErrorException("Error in curl connection: " . curl_error($ch));
        }
        curl_close($ch);
        $this->apiToken = $data->token;
        $this->apiTokenType = $data->type;

    }

    /**
     * Get all games
     */
    public function getGames()
    {
        return $this->call();
    }

    /**
     * Get all upcoming draws
     */
    public function getUpcomingDraws()
    {
        return $this->call('upcoming');
    }

    /**
     * Get game details i.e Game complete name, game description
     * @param string $game Game type [game slug]
     */
    public function getGameDetails($game)
    {
        return $this->call($game);
    }

    /**
     * Get list of draws ordered by draw date, paginated by newest to oldest
     * @param string $game Game type [game slug]
     */
    public function getDraws($game)
    {        
        return $this->call($game . '/draw/results');
    }

    /**
     * Get all upcoming draws by specific game
     * Ordered by newest to oldest
     * @param string $game Game type [game slug]
     */
    public function getUpcomingDrawsByGame($game)
    {
        return $this->call($game . '/draw/upcoming');
    }

    /**
     * Get all results by game
     * Paginated from newest to oldest
     * @param string $game Game type [game slug]
     */
    public function getGameResults($game)
    {
        return $this->call($game . '/draw/results');
    }

    /**
     * Results API request
     * @param $endpoint  API endpoint
     * @return JSON
     */
    private function call($endpoint = '')
    {
        if ($this->apiToken !== false && $this->apiTokenType !== false) {
            $this->buildApiURL();

            $apiUrl = ($endpoint != '') ? $this->apiURL . '/' . $endpoint : $this->apiURL;
            echo "$apiUrl \n";
            // cURL process
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Authorization: '.$this->apiTokenType . ' ' . $this->apiToken
            ));
            $data = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

            if ($httpCode < 200 || $httpCode >= 300) {
                throw new \yii\base\ErrorException("Error contacting API: " . curl_error($ch));
            }

            curl_close($ch);

            return $data;
        }
        return false;
    }

    /**
     * Build API URL
     *
     */
    private function buildApiURL()
    {
        $this->apiURL = $this->apiBaseURL . '/' . $this->apiVersion . '/games';

        if ($this->variant != '') {
            $this->apiURL .= '/' . $this->variant;
        }
    }
}

?>
