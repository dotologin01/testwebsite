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
    notification.classList.remove('hidden');document.addEventListener('DOMContentLoaded', async () => {
        const orderedDishesContainer = document.getElementById('orderedDishes');
        const orderForm = document.getElementById('order-form');
        const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes'; // Верный URL
    
        const selectedDishesIds = JSON.parse(localStorage.getItem('selectedDishes')) || [];
    
        if (selectedDishesIds.length === 0) {
            const emptyOrderMessage = document.createElement('div'); // Создаем div для сообщения
            emptyOrderMessage.className = 'empty-order-message'; // Добавляем класс для стилей
            emptyOrderMessage.innerHTML = '<p>Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на <a href ="../lunchmake/makelunch.html" class="empty-order-message-href">страницу "Собрать ланч"</a>.</p>'; // Добавляем текст с ссылкой
    
            orderedDishesContainer.appendChild(emptyOrderMessage);
        } else {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const dishes = await response.json();
    
                selectedDishesIds.forEach(dishId => {
                    const dish = dishes.find(d => d.id === parseInt(dishId));
    
                    if (dish) {
                        // Создаем карточку блюда
                        const dishElement = createDishElement(dish);
                        orderedDishesContainer.appendChild(dishElement);
    
                        // Обработчик удаления блюда
                        dishElement.querySelector('.remove-button').addEventListener('click', () => {
                            removeDishFromOrder(dish.id, dishElement, orderForm, dishes); // Новая функция - см. ниже
                        });
                    }
                });
    
                updateOrderDisplay(dishes);
    
                const deliveryTypeRadios = document.querySelectorAll('input[name="delivery_type"]');
                const deliveryTimeContainer = document.getElementById('delivery-time-container');
                const deliveryTimeInput = document.getElementById('delivery_time');
    
                deliveryTypeRadios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        if (radio.value === 'by_time') {
                            deliveryTimeContainer.style.display = 'block';
                            deliveryTimeInput.required = true; // Делаем поле обязательным
                        } else {
                            deliveryTimeContainer.style.display = 'none';
                            deliveryTimeInput.required = false; // Убираем обязательность
                        }
                    });
                });
    
                orderForm.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    
                    if (!checkOrder()) {
                        alert("Пожалуйста, выберите правильную комбинацию блюд");
                        return;
                    }
                    
                    const formData = new FormData(orderForm);
    
                    /*if (!checkOrder()) { // Проверяем заказ
                        alert("Пожалуйста, соберите один из наборов."); // Выводим сообщение об ошибке, если заказ некорректен
                        return; // Прерываем выполнение обработчика
                    }*/
                    try { // try для получения блюд
                        const dishesResponse = await fetch(apiUrl);
                        if (!dishesResponse.ok) {
                            throw new Error(`Ошибка при получении данных о блюдах: ${dishesResponse.status}`);
                        }
                        const dishesData = await dishesResponse.json();
    
                        selectedDishesIds.forEach(dishId => {
                            const dish = dishesData.find(d => d.id === parseInt(dishId));
                            if (dish) {
                                formData.append(`${dish.category}_id`, dish.id);
                            }
                        });
    
                        const subscribe = document.getElementById('subscribe').checked ? 1 : 0;
                        formData.append('subscribe', subscribe);
    
    
                        // delivery_type и delivery_time
                        const deliveryType = document.querySelector('input[name="delivery_type"]:checked').value;
                        formData.append('delivery_type', deliveryType);
    
                        formData.append('delivery_time', '00:00'); // Добавляем delivery_time всегда
    
                        if (deliveryType === 'by_time') { // Если выбрано "К указанному времени", обновляем значение
                            const deliveryTime = document.getElementById('delivery_time').value;
                            formData.set('delivery_time', deliveryTime); // Используем set для обновления значения
                        }
                        let deliveryTime = '00:00'; // Значение по умолчанию
                        if (document.querySelector('input[name="delivery_type"]:checked').value === 'by_time') {
                            const deliveryTimeInput = document.getElementById('delivery_time');
                            deliveryTime = deliveryTimeInput.value || '00:00'; // Используем значение из input или значение по умолчанию, если input пустой
                        }
    
    
                        formData.set('delivery_time', deliveryTime);
    
                        const apiKey = '6abf2df4-0e72-432b-87c4-7879dd7c4d85';
                        const apiUrlWithKey = `${orderForm.action}?api_key=${apiKey}`;
    
                        try { // try для отправки заказа
                            const response = await fetch(apiUrlWithKey, {
                                method: 'POST',
                                body: formData
                            });
    
    
                            if (!response.ok) {
                                // Обработка ошибок
                                const errorData = await response.json();
                                const errorMessage = errorData?.error || "Ошибка при отправке запроса";
                                alert(errorMessage);
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
    
                            const result = await response.json();
                            console.log("Заказ успешно отправлен:", result);
    
    
                            localStorage.removeItem('selectedDishes'); // Очищаем localStorage после успешного заказа. 'order' не нужно очищать
                            alert("Ваш заказ успешно оформлен!");
                            window.location.href = '../lunchmake/makelunch.html'; // Перенаправляем обратно на страницу выбора блюд.
    
    
                        } catch (error) {
                            console.error("Ошибка при отправке заказа:", error);
                            alert("Произошла ошибка при отправке заказа. Попробуйте снова.");
                        }
    
    
                    } catch (error) { // catch для получения блюд
                        console.error("Ошибка при получении данных о блюдах:", error);
                    }
    
    
                });
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        }
    });
    
    // Функция для создания карточки блюда
    function createDishElement(dish) {
        const dishElement = document.createElement('div');
        dishElement.classList.add('ordered-dish');
        dishElement.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p>Цена: ${dish.price}₽</p>
        <p>${dish.name}</p>
        <p>Вес: ${dish.count}</p>
        <button class="remove-button" data-dish-id="${dish.id}">Удалить</button>
      `;
        return dishElement;
    }
    
    // Функция для удаления блюда из заказа
    function removeDishFromOrder(dishId, dishElement, orderForm, dishes) {
        let selectedDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];
        selectedDishes = selectedDishes.filter(id => id !== dishId);
        localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));
        dishElement.remove();
        updateOrderDisplay(dishes);
        if (selectedDishes.length === 0) {
            const orderedDishesContainer = document.getElementById('orderedDishes');
            orderedDishesContainer.innerHTML = ''; // Очищаем контейнер
    
            const emptyOrderMessage = document.createElement('div'); // Создаем div для сообщения
            emptyOrderMessage.className = 'empty-order-message'; // Добавляем класс для стилей
            emptyOrderMessage.innerHTML = '<p>Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на <a href ="../lunchmake/makelunch.html" class="empty-order-message-href">страницу "Собрать ланч"</a>.</p>'; // Добавляем текст с ссылкой
    
            orderedDishesContainer.appendChild(emptyOrderMessage);
        }
        // Обновляем объект order
        const category = Object.keys(order).find(key => order[key]?.id === dishId);
        if(category) {
            order[category] = null;
        }
    }
    
    
    
    function updateOrderDisplay(dishes) {
        const orderSection = document.getElementById('order-details');
        orderSection.innerHTML = ''; // Очищаем содержимое
    
        const orderTitle = document.createElement('h3');
        orderTitle.textContent = 'Ваш заказ';
        orderSection.appendChild(orderTitle);
    
        const selectedDishesIds = JSON.parse(localStorage.getItem('selectedDishes')) || [];
    
        // Создаем объект для хранения информации о выбранных блюдах по категориям
        const selectedDishesByCategory = {
            soup: null,
            "main-course": null,
            salad: null,
            drink: null,
            dessert: null
        };
    
        if (selectedDishesIds.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'bold-text';
            emptyMessage.textContent = 'Ничего не выбрано';
            orderSection.appendChild(emptyMessage);
        } else {
            selectedDishesIds.forEach(dishId => {
                const dish = dishes.find(d => d.id === parseInt(dishId));
                if (dish) {
                    selectedDishesByCategory[dish.category] = dish;
                }
            });
    
            // Отображаем информацию о каждом блюде или "Ничего не выбрано"
            const categories = ["soup", "main-course", "salad", "drink", "dessert"];
            const categoryNames = ["Суп", "Главное блюдо", "Салат или стартер", "Напиток", "Десерт"];
    
            categories.forEach((category, index) => {
                const dishInfo = document.createElement('p');
                if (selectedDishesByCategory[category]) {
                    dishInfo.innerHTML = `<h4>${categoryNames[index]}:</h4> ${selectedDishesByCategory[category].name} - ${selectedDishesByCategory[category].price}₽`;
    
                } else {
                    dishInfo.innerHTML = `<h4>${categoryNames[index]}:</h4> Ничего не выбрано`;
                }
    
                orderSection.appendChild(dishInfo);
            });
    
            let totalPrice = 0;
            for (const category in selectedDishesByCategory) { //totalPrice считаем по selectedDishesByCategory
                if (selectedDishesByCategory[category]) {
                    totalPrice += selectedDishesByCategory[category].price;
                }
            }
    
            if (totalPrice > 0) {
                const totalInfo = document.createElement('p');
                totalInfo.innerHTML = `<h4>Стоимость заказа:</h4> ${totalPrice}₽`;
                orderSection.appendChild(totalInfo);
            }
    
    
        }
    
    
        // Добавляем поле для комментария (всегда)
        const commentLabel = document.createElement('label');
        commentLabel.htmlFor = 'comment';
        commentLabel.textContent = 'Комментарий к заказу:';
        commentLabel.className = 'comment_from_java'; // Добавляем класс для стилей
        orderSection.appendChild(commentLabel);
    
    
        const commentArea = document.createElement('textarea');
        commentArea.id = 'comment';
        commentArea.name = 'comment';
        commentArea.rows = 4;
        orderSection.appendChild(commentArea);
    }
    
    


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
