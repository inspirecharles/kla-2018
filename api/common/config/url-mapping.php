<?php

return [
    'class' => 'yii\web\UrlManager',
    'enablePrettyUrl' => true,
    'enableStrictParsing' => true,
    'showScriptName' => false,
    'rules' => [
        '<controller:\w+>/' => '<controller>/index',
        '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
    ],
];
