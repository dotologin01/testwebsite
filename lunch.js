// Import the dishes array from dishes.js
import { dishes } from './dishes.js';

// Sort dishes alphabetically by name
dishes.sort((a, b) => a.name.localeCompare(b.name));

// Переменные для хранения выбранных блюд по категориям
let selectedSoup = null;
let selectedMain = null;
let selectedDrink = null;
let totalPrice = 0;

// Функция для сброса выбранных блюд
function resetorder() {
    selectedSoup = null;
    selectedMain = null;
    selectedDrink = null;
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
        
    }

    // Обновляем список заказа и пересчитываем итоговую стоимость
    updateOrder();
}

// Функция для обновления отображения заказа и общей стоимости
function updateOrder() {
    const soupLabel = document.querySelector('#souplabel');
    const mainLabel = document.querySelector('#mainlabel');
    const drinkLabel = document.querySelector('#drinklabel');
    const soupLabel1 = document.querySelector('#souplabel1');
    const mainLabel1 = document.querySelector('#mainlabel1');
    const drinkLabel1 = document.querySelector('#drinklabel1');
    const totalElement = document.querySelector('#totallabel');
    const emptyMessage = document.querySelector('#empty-message');

    // Обновляем лейблы для каждого типа блюда
    soupLabel.textContent = selectedSoup ? `${selectedSoup.name} - ${selectedSoup.price}₽` : 'Блюдо не выбрано';
    mainLabel.textContent = selectedMain ? `${selectedMain.name} - ${selectedMain.price}₽` : 'Блюдо не выбрано';
    drinkLabel.textContent = selectedDrink ? `${selectedDrink.name} - ${selectedDrink.price}₽` : 'Напиток не выбран';

    // Пересчитываем итоговую стоимость
    totalPrice = 0;
    if (selectedSoup) totalPrice += selectedSoup.price;
    if (selectedMain) totalPrice += selectedMain.price;
    if (selectedDrink) totalPrice += selectedDrink.price;

    // Обновляем отображение итоговой стоимости
    totalElement.textContent = `Итого: ${totalPrice}₽`;

    // Управляем видимостью меток и сообщения
    const labelsVisible = selectedSoup || selectedMain || selectedDrink;
    soupLabel.style.display = labelsVisible ? 'block' : 'none';
    mainLabel.style.display = labelsVisible ? 'block' : 'none';
    drinkLabel.style.display = labelsVisible ? 'block' : 'none';
    soupLabel1.style.display = labelsVisible ? 'block' : 'none';
    mainLabel1.style.display = labelsVisible ? 'block' : 'none';
    drinkLabel1.style.display = labelsVisible ? 'block' : 'none';
    totalElement.style.display = labelsVisible ? 'block' : 'none';
    emptyMessage.style.display = labelsVisible ? 'none' : 'block'; // Показать или скрыть сообщение

    if (!labelsVisible) {
        hideOrderCategory();
    } else {
        document.querySelector('#order-category').style.display = 'block'; // Показываем контейнер, если есть выбор
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const soupLabel = document.querySelector('#souplabel');
    const mainLabel = document.querySelector('#mainlabel');
    const drinkLabel = document.querySelector('#drinklabel');
    const drinkLabel1 = document.querySelector('#drinklabel1');
    const soupLabel1 = document.querySelector('#souplabel1');
    const mainLabel1 = document.querySelector('#mainlabel1');
    const totalElement = document.querySelector('#totallabel');
    const emptyMessage = document.querySelector('#empty-message');
    soupLabel.style.display = 'none';
    mainLabel.style.display = 'none';
    drinkLabel.style.display = 'none';
    soupLabel1.style.display = 'none';
    mainLabel1.style.display = 'none';
    drinkLabel1.style.display = 'none';
    totalElement.style.display = 'none';
    emptyMessage.style.display = 'block'; // Показываем сообщение "Ничего не выбрано"
});

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
            <button class="add-button" data-keyword="${dish.keyword}" data-price="${dish.price}">Добавить</button>
        `;

        // Добавляем блюдо в соответствующий раздел
        if (dish.category === 'soup') {
            soupSection.appendChild(dishDiv);
        } else if (dish.category === 'main') {
            mainSection.appendChild(dishDiv);
        } else if (dish.category === 'drink') {
            drinkSection.appendChild(dishDiv);
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

// Initialize the display of dishes
displayDishes();
