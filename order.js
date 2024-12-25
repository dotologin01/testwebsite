let order = {
    soup: null,
    "main-course": null,
    salad: null,
    drink: null,
    dessert: null
};

function addToOrder(dish) {
    order[dish.category] = dish;
    /*updateOrderDisplay();*/
}

function updateOrderDisplay() {
    const orderSection = document.querySelector('.order-section');

    const soupText = order.soup ? `${order.soup.name} ${order.soup.price}₽` : 'Блюдо не выбрано';
    const mainDishText = order["main-course"] ? `${order["main-course"].name} ${order["main-course"].price}₽` : 'Блюдо не выбрано';
    const saladStarterText = order.salad ? `${order.salad.name} ${order.salad.price}₽` : 'Салат или стартер не выбран';
    const drinkText = order.drink ? `${order.drink.name} ${order.drink.price}₽` : 'Напиток не выбран';
    const desertText = order.dessert ? `${order.dessert.name} ${order.dessert.price}₽` : 'Десерт не выбран';

    const total = (order.soup ? order.soup.price : 0) +
        (order.main_dish ? order.main_dish.price : 0) +
        (order.salad ? order.salad.price : 0) +
        (order.drink ? order.drink.price : 0) +
        (order.dessert ? order.dessert.price : 0);

    if (!order.soup && !order["main-course"] && !order.salad && !order.drink && !order.dessert) {
        orderSection.innerHTML = `
            <h3>Ваш заказ</h3>
            <p class="bold-text">Ничего не выбрано</p>
            <label for="comment" class="comment_from_java">Комментарий к заказу</label>
            <textarea id="comment" name="comment" rows="4"></textarea>
        `;
    } else {
        orderSection.innerHTML = `
        <h3>Ваш заказ</h3>
        <h4>Суп:</h4>
        ${soupText}<br><br>
        <h4>Главное блюдо:</h4>
        ${mainDishText}<br><br>
        <h4>Салат или стартер:</h4>
        ${saladStarterText}<br><br>
        <h4>Напиток:</h4>
        ${drinkText}<br><br>
        <h4>Десерт:</h4>
        ${desertText}<br><br>
        ${total > 0 ? `<h4>Стоимость заказа:</h4>${total}₽` : ''}
        <label for="comment" class="comment_from_java">Комментарий к заказу</label>
        <textarea id="comment" name="comment" rows="4"></textarea>
      `;
    }
}

function checkOrder() {
    const selectedDishesIds = JSON.parse(localStorage.getItem('selectedDishes')) || [];
    
    // Если нет выбранных блюд, возвращаем false
    if (selectedDishesIds.length === 0) {
        return false;
    }

    // Подсчитываем количество блюд каждой категории
    let categories = {
        soup: 0,
        "main-course": 0,
        salad: 0,
        drink: 0
    };

<<<<<<<< HEAD:order_java/order.js
    selectedDishesIds.forEach(dishId => {
        const dish = sortedDishes.find(d => d.id === parseInt(dishId));
        if (dish && categories.hasOwnProperty(dish.category)) {
            categories[dish.category]++;
        }
    });

    // Проверяем допустимые комбинации
    const validCombinations = [
        // Полный набор
        categories.soup >= 1 && categories["main-course"] >= 1 && categories.salad >= 1 && categories.drink >= 1,
        // Суп + главное + напиток
        categories.soup >= 1 && categories["main-course"] >= 1 && categories.drink >= 1,
        // Суп + салат + напиток
        categories.soup >= 1 && categories.salad >= 1 && categories.drink >= 1,
        // Главное + салат + напиток
        categories["main-course"] >= 1 && categories.salad >= 1 && categories.drink >= 1,
        // Главное + напиток
        categories["main-course"] >= 1 && categories.drink >= 1
    ];

    return validCombinations.some(combo => combo === true);
========
    if (!hasSoup && !hasMainDish && !hasSaladStarter && !hasDrink && !hasDesert) {
        showNotification("Ничего не выбрано. Выберите блюда для заказа");
        return false;
    } else if (hasSoup && !hasMainDish && !hasSaladStarter && !hasDrink) { // Только суп - ошибка
        showNotification("Выберите главное блюдо/салат/стартер и напиток");
        return false;
    } else if (hasSaladStarter && !hasSoup && !hasMainDish && !hasDrink) { // Только салат/стартер - ошибка
        showNotification("Выберите суп или главное блюдо и напиток");
        return false;
    }else if (!hasDrink && (hasSoup || hasMainDish || hasSaladStarter)) {
        showNotification("Выберите напиток");
        return false;
    } else if (hasSoup && !(hasMainDish || hasSaladStarter)) { // Только суп - ошибка
        showNotification("Выберите главное блюдо/салат/стартер");
        return false;
    }else if ((hasSaladStarter || hasMainDish) && !hasSoup && hasDrink) {
        showNotification("Выберите суп");
        return false;
    }
    else if ((hasDrink || hasDesert) && !hasMainDish && !(hasSoup && hasSaladStarter)) { //Напиток/Десерт без главного - ошибка
        showNotification("Выберите главное блюдо");
        return false;
    }
    else {
        return true;  // Заказ корректен
    }
>>>>>>>> 5559f9a9a0ba002b3b7fcbfe1fa4b03e487bdea4:order.js
}

function showNotification(message) {

    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    const notificationButton = document.getElementById('notification-button');

    document.body.classList.add('noscroll'); // Отключаем прокрутку

    notificationButton.addEventListener('click', () => {
        notification.classList.add('hidden');
        document.body.classList.remove('noscroll'); // Включаем прокрутку обратно
    });

    notificationText.textContent = message;
    notification.classList.remove('hidden');


    notificationButton.addEventListener('click', () => {
        notification.classList.add('hidden');
    });
}


document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('form').addEventListener('submit', (event) => {
        if (!checkOrder()) {
            event.preventDefault();
        }
    });
});
