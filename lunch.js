// Import the dishes array from dishes.js
import { dishes } from './dishes.js';

// Sort dishes alphabetically by name
dishes.sort((a, b) => a.name.localeCompare(b.name));

// Переменные для хранения выбранных блюд по категориям
let selectedSoup = null;
let selectedMain = null;
let selectedDrink = null;
let selectedSaladStarter = null;
let selectedDessert = null;
let totalPrice = 0;

// Функция для сброса выбранных блюд
function resetorder() {
    selectedSoup = null;
    selectedMain = null;
    selectedDrink = null;
    selectedSaladStarter = null;
    selectedDessert = null;
    totalPrice = 0;
    
    // Обновляем отображение заказа
    updateOrder();
}


function hideOrderCategory() {
    const orderCategory = document.querySelector('#order-category');
    orderCategory.style.display = 'none';
}

// Добавляем обработчик событий для кнопки сброса
document.getElementById('resetbutton').addEventListener('click', resetorder);

// Функция для добавления блюда в заказ
function addorder(keyword, price) {
    const dish = dishes.find(d => d.keyword === keyword);

    // Определяем категорию блюда и заменяем выбранное блюдо в соответствующей категории
    if (dish.category === 'soup') {
        selectedSoup = dish;
    } else if (dish.category === 'main') {
        selectedMain = dish;
    } else if (dish.category === 'drink') {
        selectedDrink = dish;
    } else if (dish.category === 'salad-starter') {
        selectedSaladStarter = dish;
    } else if (dish.category === 'dessert') {
        selectedDessert = dish;
    }

    // Обновляем список заказа и пересчитываем итоговую стоимость
    updateOrder();
}


// Функция для обновления отображения заказа и общей стоимости
function updateOrder() {
    const soupLabel = document.querySelector('#souplabel');
    const mainLabel = document.querySelector('#mainlabel');
    const drinkLabel = document.querySelector('#drinklabel');
    const saladStarterLabel = document.querySelector('#saladstarterlabel');
    const dessertLabel = document.querySelector('#dessertlabel');

    const soupLabel1 = document.querySelector('#souplabel1');
    const mainLabel1 = document.querySelector('#mainlabel1');
    const drinkLabel1 = document.querySelector('#drinklabel1');
    const saladStarterLabel1 = document.querySelector('#saladstarterlabel1');
    const dessertLabel1 = document.querySelector('#dessertlabel1');

    const totalElement = document.querySelector('#totallabel');
    const emptyMessage = document.querySelector('#empty-message');

    // Обновляем лейблы для каждого типа блюда
    soupLabel.textContent = selectedSoup ? `${selectedSoup.name} - ${selectedSoup.price}₽` : 'Блюдо не выбрано';
    mainLabel.textContent = selectedMain ? `${selectedMain.name} - ${selectedMain.price}₽` : 'Блюдо не выбрано';
    drinkLabel.textContent = selectedDrink ? `${selectedDrink.name} - ${selectedDrink.price}₽` : 'Напиток не выбран';
    saladStarterLabel.textContent = selectedSaladStarter ? `${selectedSaladStarter.name} - ${selectedSaladStarter.price}₽` : 'Блюдо не выбрано';
    dessertLabel.textContent = selectedDessert ? `${selectedDessert.name} - ${selectedDessert.price}₽` : 'Десерт не выбран';

    // Пересчитываем итоговую стоимость
    totalPrice = 0;
    if (selectedSoup) totalPrice += selectedSoup.price;
    if (selectedMain) totalPrice += selectedMain.price;
    if (selectedDrink) totalPrice += selectedDrink.price;
    if (selectedSaladStarter) totalPrice += selectedSaladStarter.price;
    if (selectedDessert) totalPrice += selectedDessert.price;

    // Обновляем отображение итоговой стоимости
    totalElement.textContent = `Итого: ${totalPrice}₽`;

    // Управляем видимостью меток и сообщения
    const labelsVisible = selectedSoup || selectedMain || selectedDrink || selectedSaladStarter || selectedDessert;
    soupLabel.style.display = labelsVisible ? 'block' : 'none';
    mainLabel.style.display = labelsVisible ? 'block' : 'none';
    drinkLabel.style.display = labelsVisible ? 'block' : 'none';
    saladStarterLabel.style.display = labelsVisible ? 'block' : 'none';
    dessertLabel.style.display = labelsVisible ? 'block' : 'none';

    soupLabel1.style.display = labelsVisible ? 'block' : 'none';
    mainLabel1.style.display = labelsVisible ? 'block' : 'none';
    drinkLabel1.style.display = labelsVisible ? 'block' : 'none';
    saladStarterLabel1.style.display = labelsVisible ? 'block' : 'none';
    dessertLabel1.style.display = labelsVisible ? 'block' : 'none';

    totalElement.style.display = labelsVisible ? 'block' : 'none';
    emptyMessage.style.display = labelsVisible ? 'none' : 'block'; // Показать или скрыть сообщение

    if (!labelsVisible) {
        hideOrderCategory();
    } else {
        document.querySelector('#order-category').style.display = 'block'; // Показываем контейнер, если есть выбор
    }
}

// Function to display dishes
function displayDishes() {
    const soupSection = document.querySelector('#soup-section');
    const mainSection = document.querySelector('#main-section');
    const drinkSection = document.querySelector('#drink-section');
    const saladStarterSection = document.querySelector('#salad-starter-section');
    const dessertSection = document.querySelector('#dessert-section');
    
    // Clear sections
    soupSection.innerHTML = '';
    mainSection.innerHTML = '';
    drinkSection.innerHTML = '';
    saladStarterSection.innerHTML = '';
    dessertSection.innerHTML = '';

    // Loop through dishes and add them to the corresponding sections
    dishes.forEach(dish => {
        const dishDiv = document.createElement('div');
        dishDiv.classList.add('dish');
        dishDiv.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="name">${dish.name}</p>
            <p class="price">${dish.price}₽</p>
            <p class="weight">${dish.count}</p>
            <button class="add-button" data-keyword="${dish.keyword}" data-price="${dish.price}">Добавить</button>
        `;

        // Добавляем блюдо в соответствующий раздел
        if (dish.category === 'soup') {
            soupSection.appendChild(dishDiv);
        } else if (dish.category === 'main') {
            mainSection.appendChild(dishDiv);
        } else if (dish.category === 'drink') {
            drinkSection.appendChild(dishDiv);
        } else if (dish.category === 'salad-starter') {
            saladStarterSection.appendChild(dishDiv);
        } else if (dish.category === 'dessert') {
            dessertSection.appendChild(dishDiv);
        }
    });
    // Добавляем обработчик событий для кнопок
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const keyword = event.target.dataset.keyword;
            const price = parseFloat(event.target.dataset.price);
            addorder(keyword, price);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kind = button.getAttribute('data-kind');
            const section = button.closest('section');
            const dishes  = section.querySelectorAll('.dish');

            // Если кнопка уже активна, снимаем класс active и показываем все блюда
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                dishes.forEach(dish => dish.style.display = 'block'); // Показываем все блюда
            } else {
                // Убираем класс active у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Добавляем класс active к текущей кнопке
                button.classList.add('active');

                // Показать/скрыть блюда в зависимости от фильтра
                dishes.forEach(dish => {
                    if (dish.getAttribute('data-kind') === kind) {
                        dish.style.display = 'block';
                    } else {
                        dish.style.display = 'none';
                    }
                });
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const soupLabel = document.querySelector('#souplabel');
    const mainLabel = document.querySelector('#mainlabel');
    const drinkLabel = document.querySelector('#drinklabel');
    const drinkLabel1 = document.querySelector('#drinklabel1');
    const soupLabel1 = document.querySelector('#souplabel1');
    const mainLabel1 = document.querySelector('#mainlabel1');
    const totalElement = document.querySelector('#totallabel');
    const emptyMessage = document.querySelector('#empty-message');
    const saladStarterLabel = document.querySelector('#saladstarterlabel');
    const dessertLabel = document.querySelector('#dessertlabel');
    const saladStarterLabel1 = document.querySelector('#saladstarterlabel1');
    const dessertLabel1 = document.querySelector('#dessertlabel1');

    soupLabel.style.display = 'none';
    mainLabel.style.display = 'none';
    drinkLabel.style.display = 'none';
    saladStarterLabel.style.display = 'none';
    dessertLabel.style.display = 'none';
    soupLabel1.style.display = 'none';
    mainLabel1.style.display = 'none';
    drinkLabel1.style.display = 'none';
    saladStarterLabel1.style.display = 'none';
    dessertLabel1.style.display = 'none';
    totalElement.style.display = 'none';
    emptyMessage.style.display = 'block'; // Показываем сообщение "Ничего не выбрано"
});



// Initialize the display of dishes
displayDishes();
