/* Стили для страницы "Собрать ланч" */

/* Основные стили для блока с блюдами (Grid) */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 колонки */
    gap: 10px; /* Отступы между элементами сетки */
    margin-bottom: 40px; /* Отступ снизу между секциями */
}

/* Стили для каждого блюда (Flex) */
.dish {
    display: flex;
    flex-direction: column; /* Вертикальное направление элементов */
    padding: 30px 40px; /* Отступы: сверху/снизу - 30px, слева/справа - 40px */
    border-radius: 35px; /* Закругленные углы */
    background-color: white; /* Белый фон */
    cursor: pointer; /* Курсор указатель */
    filter: drop-shadow(17px 19px 24px rgba(0, 0, 0, 0.13)); /* Тень */
    transition: border 0.3s ease, background-color 0.3s ease; /* Плавный переход для hover */
}

.dish:hover {
    border: 2px solid tomato; /* Граница при наведении */
}

/* Изменение стиля кнопки внутри блока при наведении на dish */
.dish:hover button {
    background-color: tomato; /* Изменение фона кнопки при наведении на блок */
}

/* Стили для изображения блюда */
.dish img {
    width: 100%; /* Изображение растягивается на всю ширину контейнера */
    border-radius: 35px; /* Закругленные углы */
    margin-bottom: 20px; /* Отступ снизу от изображения */
}

/* Стили для текста с названием блюда */
.dish .name {
    font-size: 1.5em; /* Увеличенный размер шрифта */
    font-weight: bold;
    margin-bottom: 10px; /* Отступ снизу */
}

/* Стили для текста с ценой */
.dish .price {
    font-size: 1.3em; /* Увеличенный размер шрифта */
    font-weight: bold;
    margin-bottom: 10px; /* Отступ снизу */
}

/* Стили для текста с весом/объемом блюда */
.dish .weight {
    color: grey; /* Серый цвет текста */
    font-size: 1em; /* Обычный размер шрифта */
    margin-bottom: 20px; /* Отступ снизу */
}

/* Стили для кнопки "Добавить" */
.dish button {
    background-color: #f1eee9; /* Цвет фона кнопки */
    padding: 10px 30px; /* Внутренние отступы: сверху/снизу - 10px, слева/справа - 30px */
    border-radius: 10px; /* Закругленные углы */
    border: none; /* Без границы */
    cursor: pointer; /* Курсор указатель */
    transition: background-color 0.3s ease; /* Плавный переход для изменения цвета */
}

/* Стили для меню (flex) */
nav {
    display: flex;
    flex-wrap: wrap; /* Разрешить перенос строк */
    gap: 15px; /* Отступы между элементами меню */
}

nav a {
    text-decoration: none; /* Убрать подчеркивание ссылок */
    color: black; /* Цвет текста ссылок */
    font-size: 1.2em;
    padding: 10px;
}

#active {
    color: tomato; /* Цвет для активной ссылки */
}

/* Адаптивные стили для ширины экрана ≤ 800px */
@media screen and (max-width: 800px) {
    .grid-container {
        grid-template-columns: repeat(2, 1fr); /* 2 колонки вместо 3 */
    }
}

/* Адаптивные стили для ширины экрана ≤ 600px */
@media screen and (max-width: 600px) {
    .grid-container {
        grid-template-columns: 1fr; /* 1 колонка вместо 3 */
    }

    nav {
        justify-content: center; /* Центрирование меню */
    }
}

