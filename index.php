<?php
    // Включаем отображение ошибок
    ini_set('display_errors', 1);
    error_reporting(E_ALL); // Показывать все ошибки

    $request_uri = $_SERVER['REQUEST_URI'];
    $to = 'https://yandex.ru';

    if ($request_uri == '/yandex') {
       
        header('Location: '. $to, true, 301);
        exit();

    } else {

        require('pages/index.php');
        print_r(getPageContent($request_uri));
        
    }
?>