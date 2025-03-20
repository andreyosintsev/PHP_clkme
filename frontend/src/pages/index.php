<?php
/** 
 *  Template File for index page
 * 
 * (c) 2025, Andrei S. Osintsev
 *  
*/

function getPageContent($request_uri) {
    return '
        <!doctype html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>'. TITLE . '</title>
        </head>
        <body>
            <h1>Вы пытаетесь перейти по ссылке:</h1>
            <p><b>'. $request_uri . '</b></p>
            <p>Но ее нет в нашей базе данных</p>
        </body>
        </html>
    ';
}