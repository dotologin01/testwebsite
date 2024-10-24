// Import the dishes array from dishes.js
import { dishes } from './dishes.js';

// Sort dishes alphabetically by name
dishes.sort((a, b) => a.name.localeCompare(b.name));

// Переменные для хранения выбранных блюд по категориям
let selectedSoup = null;
let selectedMain = null;
let selectedDrink = null;
let totalPrice = 0;

// Функция для добавления блюда в заказ
function addorder(keyword, price) {
    console.log('test');
    const dish = dishes.find(d => d.keyword === keyword);

    // Определяем категорию блюда и заменяем выбранное блюдо в соответствующей категории
    if (dish.category === 'soup') {
        selectedSoup = dish;
    } else if (dish.category === 'main') {
        selectedMain = dish;
    } else if (dish.category === 'drink') {
        selectedDrink = dish;
    }

    // Обновляем список заказа и пересчитываем итоговую стоимость
    updateOrder();
}

// Функция для обновления отображения заказа и общей стоимости
function updateOrder() {
    const soupLabel = document.querySelector('#souplabel');
    const mainLabel = document.querySelector('#mainlabel');
    const drinkLabel = document.querySelector('#drinklabel');
    const totalElement = document.querySelector('#totallabel');

    // Обновляем лейблы для каждого типа блюда
    if (selectedSoup) {
        soupLabel.textContent = `${selectedSoup.name} - ${selectedSoup.price}₽`;
    } else {
        soupLabel.textContent = 'Блюдо не выбрано';
    }

    if (selectedMain) {
        mainLabel.textContent = `${selectedMain.name} - ${selectedMain.price}₽`;
    } else {
        mainLabel.textContent = 'Блюдо не выбрано';
    }

    if (selectedDrink) {
        drinkLabel.textContent = `${selectedDrink.name} - ${selectedDrink.price}₽`;
    } else {
        drinkLabel.textContent = 'Напиток не выбран';
    }

    // Пересчитываем итоговую стоимость
    totalPrice = 0;
    if (selectedSoup) totalPrice += selectedSoup.price;
    if (selectedMain) totalPrice += selectedMain.price;
    if (selectedDrink) totalPrice += selectedDrink.price;

    // Обновляем отображение итоговой стоимости
    totalElement.textContent = `Итого: ${totalPrice}₽`;
}



// Function to display dishes
function displayDishes() {
    const soupSection = document.querySelector('#soup-section');
    const mainSection = document.querySelector('#main-section');
    const drinkSection = document.querySelector('#drink-section');
    
    // Clear sections
    soupSection.innerHTML = '';
    mainSection.innerHTML = '';
    drinkSection.innerHTML = '';

    // Loop through dishes and add them to the corresponding sections
    dishes.forEach(dish => {
        const dishDiv = document.createElement('div');
        dishDiv.classList.add('dish');
        dishDiv.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="name">${dish.name}</p>
            <p class="price">${dish.price}₽</p>
            <p class="weight">${dish.count}</p>
            <button onclick="addorder(${dish.name}, ${dish.price})">Добавить</button>
        `;

        // Add dish to the correct category
        if (dish.category === 'soup') {
            soupSection.appendChild(dishDiv);
        } else if (dish.category === 'main') {
            mainSection.appendChild(dishDiv);
        } else if (dish.category === 'drink') {
            drinkSection.appendChild(dishDiv);
        }
    });
}

// Initialize the display of dishes
displayDishes();