<?php

return [
    'class' => 'yii\web\UrlManager',
    'enablePrettyUrl' => true,
    'enableStrictParsing' => false,
    'showScriptName' => false,
    'rules' => [
        '<controller:\w+>/' => '<controller>/index',
        '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
        'news/update/<id:\d+>' => 'news/update',
    ],
];
