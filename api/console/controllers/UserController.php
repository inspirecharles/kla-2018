<?php

namespace console\controllers;

use Yii;
use yii\console\Controller;
use yii\console\widgets\Table;
use common\models\User;

class UserController extends Controller
{

    public function actionCreate()
    {
        
        $new_user = new User();

        $this->stdout("\nWe need a little information before we can complete the account creation.\n");

        $new_user->email = $this->prompt("Enter the account email:", ['required' => true]);
        $new_user->username = $this->prompt("Enter the account username:", ['required' => true]);
        $new_user->temp_password = $this->prompt("Enter the account password:", ['required' => true]);
        $new_user->repeat_password = $this->prompt("Repeat password exactly:", ['required' => true]);
        $new_user->firstname = $this->prompt("Enter the first name of the account holder:", ['required' => true]);
        $new_user->lastname = $this->prompt("Enter the last name of the account holder:", ['required' => true]);

        if( $new_user->temp_password == $new_user->repeat_password ){
            $new_user->setPassword($new_user->temp_password);
            $new_user->generateAuthKey();

            if ($new_user->save()) {

                $this->stdout("\nSuccess New Admin account created.\n");
                $new_user->refresh();

                $headers = array('#ID', 'Username', 'Email', 'First Name', 'Last Name');
                $data = [
                    [
                        $new_user->id,
                        $new_user->email,
                        $new_user->username,
                        $new_user->firstname,
                        $new_user->lastname
                    ],
                ];

                $table = new Table();
                $table->setHeaders($headers);
                $table->setRows($data);
                $table->run();
            } else {

                $this->stderr("\nError Unable to create admin account");

                $this->stdout("\nYou have the following errors:");

                $headers = ['Field', 'Errors'];

                $data = [];

                foreach ($new_user->errors as $field => $errors) {
                    foreach ($errors as $error) {
                        $data[] = [$field, $error];
                    }
                }

                $table = new Table();
                $table->setHeaders($headers);
                $table->setRows($data);
                $table->run();
            }
        }
        else{
            $this->stderr("\nRepeat password doesnt match");
        }
    }
}



