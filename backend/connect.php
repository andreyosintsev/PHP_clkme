<?php
    $connect = new mysqli($servername, $username, $password, $dbname);

    // Проверка подключения
    if ($conn->connect_error) {
        die("Ошибка подключения: " . $conn->connect_error);
    } else {
        echo "Подключение к базе данных успешно!";
    }

    // Закрытие подключения
    $conn->close();