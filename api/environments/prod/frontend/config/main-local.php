<?php
return [
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => '',
        ],
        'response' => [                 
            'format' => yii\web\Response::FORMAT_JSON, 
            'charset' => 'UTF-8',               
        ],
    ],
];
