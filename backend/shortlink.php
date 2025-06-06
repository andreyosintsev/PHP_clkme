<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    
    require('config.php');
    require('functions.php');

    // Включаем отображение ошибок
    ini_set('display_errors', 1);
    error_reporting(E_ALL); // Показывать все ошибки

    // Подключаемся к базе данных
    $connect = new mysqli(SERVER_NAME, DB_USER, DB_PASS, DB_NAME);

    if ($connect->connect_error) {
        echo json_encode([
            'result' => 'failed',
            'message' => 'DB connection error',
        ]);
        exit("Ошибка подключения: " . $connect->connect_error);
    }

    $connect->close();

    echo json_encode([
        'result' => 'success',
        'message' => 'success',
        'shortLink' => 'clkme.ru/shortlink'
    ]);