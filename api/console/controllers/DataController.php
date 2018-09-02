<?php
/**
 * Created by PhpStorm.
 * User: leviputna
 * Date: 2/02/15
 * Time: 5:34 PM
 */

namespace console\controllers;

use console\models\DataImportModel;
use yii,
    yii\db,
    yii\console\Controller;
use console\models\DataImport;

class DataController extends Controller
{
    private $connection;

    public function actionIndex($variant = false) {
        if ($variant) {
            $this->processVariant($variant);
            exit;
        }
        echo "Variant is required to run the default task\n";
    }

    private function processVariant($variant)
    {

        echo "Import Base Data for $variant \n";

        $this->connection = Yii::$app->db;

        try {

            echo "Importing: \n";
            $files = scandir(\Yii::getAlias('@app') . '/data/'.$variant.'/');

            if (count($files) == 2) {
                echo "No data found for import. \n";
                exit;
            }

            foreach ($files as $file) {
                //check if we have imported this already
                $data_import_model = new DataImportModel();

                //only import sql files
                if (stristr($file, '.sql') && !$data_import_model->find()->where(['name' => $file])->one()) {
                    //this is a sql file
                    echo str_pad(" - $file", 50, '.') . " \n";
                    $this->import(\Yii::getAlias('@app') . '/data/' .$variant . '/' . $file);

                    $data_import_model->name = $file;
                    $data_import_model->import_date = date('Y-m-d H:i:s');
                    $data_import_model->save();
                } else if(stristr($file, '.sql')) {
                    echo " - Skipping $file (already imported)\n";
                }
            }

            echo "\n Data imported successfully\n";
        } catch (yii\base\ErrorException $e) {
            echo "\n" . $e->getMessage() . "\n";
            echo "Failed to import sample data" . "\n";
            exit;
        }

    }

    protected function import($file)
    {

        $info = pathinfo($file);
        $name = $info['filename'];
        $table = preg_replace('/\d+(-)/', '', $name);
        //$this->truncate($table);

        $templine = '';
        $lines = file($file);

        try {
            foreach ($lines as $line) {
                if (substr($line, 0, 2) == '--' || $line == '')
                    continue;

                $templine .= $line;
                if (substr(trim($line), -1, 1) == ';') {

                    $command = $this->connection->createCommand($templine);
                    $command->execute(); // execute the non-query SQL
                    $templine = '';
                }
            }
            echo "success\n";
        } catch (Exception $e) {
            echo "Import failed\n";
            echo $e->getTraceAsString() . "\n";
            throwException($e);
        }

    }

}
