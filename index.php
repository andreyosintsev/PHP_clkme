<?php
    require('config.php');
    require('functions.php');

    // Включаем отображение ошибок
    ini_set('display_errors', 1);
    error_reporting(E_ALL); // Показывать все ошибки

    // Подключаемся к базе данных
    $connect = new mysqli(SERVER_NAME, DB_USER, DB_PASS, DB_NAME);

    if ($connect->connect_error) {
        exit("Ошибка подключения: " . $connect->connect_error);
    }

    $connect->close();

    $request_uri = $_SERVER['REQUEST_URI'];
    $to = 'https://yandex.ru';

    if ($request_uri == '/yandex') {
       
        header('Location: '. $to, true, 301);
        exit();

    } else {

        require('pages/index.php');
        print_r(getPageContent($request_uri));

    }