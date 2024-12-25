// Глобальные переменные для API
const apiKey = 'd70c5ad1-1980-475b-b33a-d68d32f1dad4';
const apiUrl = 'http://lab8-api.std-900.ist.mospolytech.ru/labs/api';

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function calculateTotalPrice(order, dishes) {
    let total = 0;
    if (order.soup_id) {
        const soup = dishes.find(d => d.id === order.soup_id);
        if (soup) total += soup.price;
    }
    if (order.main_course_id) {
        const main = dishes.find(d => d.id === order.main_course_id);
        if (main) total += main.price;
    }
    if (order.salad_id) {
        const salad = dishes.find(d => d.id === order.salad_id);
        if (salad) total += salad.price;
    }
    if (order.drink_id) {
        const drink = dishes.find(d => d.id === order.drink_id);
        if (drink) total += drink.price;
    }
    if (order.dessert_id) {
        const dessert = dishes.find(d => d.id === order.dessert_id);
        if (dessert) total += dessert.price;
    }
    return total;
}

function formatOrderComposition(order, dishes) {
    const orderDishes = [];
    if (order.soup_id) {
        const soup = dishes.find(d => d.id === order.soup_id);
        if (soup) orderDishes.push(soup.name);
    }
    if (order.main_course_id) {
        const main = dishes.find(d => d.id === order.main_course_id);
        if (main) orderDishes.push(main.name);
    }
    if (order.salad_id) {
        const salad = dishes.find(d => d.id === order.salad_id);
        if (salad) orderDishes.push(salad.name);
    }
    if (order.drink_id) {
        const drink = dishes.find(d => d.id === order.drink_id);
        if (drink) orderDishes.push(drink.name);
    }
    if (order.dessert_id) {
        const dessert = dishes.find(d => d.id === order.dessert_id);
        if (dessert) orderDishes.push(dessert.name);
    }
    return orderDishes.join(', ') || 'Пустой заказ';
}

// Функция загрузки заказов
async function loadOrders() {
    const ordersContainer = document.querySelector('#orders-table tbody');
    if (!ordersContainer) {
        console.error('Контейнер для заказов не найден');
        return;
    }

    try {
        // Загружаем заказы
        const ordersResponse = await fetch(`${apiUrl}/orders?api_key=${apiKey}`);
        if (!ordersResponse.ok) {
            throw new Error('Ошибка при загрузке заказов');
        }
        const orders = await ordersResponse.json();

        // Загружаем блюда
        const dishesResponse = await fetch(`${apiUrl}/dishes?api_key=${apiKey}`);
        if (!dishesResponse.ok) {
            throw new Error('Ошибка при загрузке блюд');
        }
        const dishes = await dishesResponse.json();

        // Сортировка по убыванию даты
        orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        ordersContainer.innerHTML = '';

        orders.forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${formatDate(order.created_at)}</td>
                <td>${formatOrderComposition(order, dishes)}</td>
                <td>${calculateTotalPrice(order, dishes)}₽</td>
                <td>${order.delivery_type === 'now' ? 'В течение дня (с 7:00 до 23:00)' : order.delivery_time}</td>
                <td class="actions-cell">
                    <button onclick="showOrderDetails(${order.id})" title="Подробнее">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button onclick="editOrder(${order.id})" title="Редактировать">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button onclick="deleteOrder(${order.id})" title="Удалить">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            ordersContainer.appendChild(row);
        });
    } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
        showNotification('Ошибка при загрузке заказов: ' + error.message, 'error');
    }
}

// Вызываем загрузку заказов после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

let currentOrderId = null;

async function showOrderDetails(orderId) {
    try {
        const response = await fetch(`${apiUrl}/orders/${orderId}?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Ошибка при получении данных заказа');
        const order = await response.json();

        const dishesResponse = await fetch(`${apiUrl}/dishes?api_key=${apiKey}`);
        if (!dishesResponse.ok) throw new Error('Ошибка при получении данных блюд');
        const dishes = await dishesResponse.json();

        const modalBody = document.querySelector('#viewOrderModal .modal-body');
        modalBody.innerHTML = `
            <div class="info-row">
                <label>Дата оформления:</label>
                <span>${formatDate(order.created_at)}</span>
            </div>
            <div class="info-row">
                <label>Имя получателя:</label>
                <span>${order.full_name}</span>
            </div>
            <div class="info-row">
                <label>Адрес доставки:</label>
                <span>${order.delivery_address}</span>
            </div>
            <div class="info-row">
                <label>Время доставки:</label>
                <span>${order.delivery_type === 'by_time' 
                    ? order.delivery_time.slice(0, 5)
                    : 'Как можно скорее (с 07:00 до 23:00)'}</span>
            </div>
            <div class="info-row">
                <label>Телефон:</label>
                <span>${order.phone}</span>
            </div>
            <div class="info-row">
                <label>Email:</label>
                <span>${order.email}</span>
            </div>
            <div class="info-row">
                <label>Комментарий:</label>
            </div>
            <div class="info-row">
                <span class="comment">${order.comment || '-Нет комментария-'}</span>
            </div>

            <div class="info-row">
                <label>Состав заказа</label>
            </div>
        `;

        // Добавляем информацию о блюдах
        const dishTypes = [
            { id: 'soup_id', label: 'Суп' },
            { id: 'main_course_id', label: 'Основное блюдо' },
            { id: 'salad_id', label: 'Салат' },
            { id: 'drink_id', label: 'Напиток' },
            { id: 'dessert_id', label: 'Десерт' }
        ];

        dishTypes.forEach(type => {
            if (order[type.id]) {
                const dish = dishes.find(d => d.id === order[type.id]);
                if (dish) {
                    const div = document.createElement('div');
                    div.className = 'info-row';
                    div.innerHTML = `
                        <label>${type.label}:</label>
                        <span>${dish.name} (${dish.price}₽)</span>
                    `;
                    modalBody.appendChild(div);
                }
            }
        });

        // Добавляем стоимость
        const totalPrice = calculateTotalPrice(order, dishes);
        const totalDiv = document.createElement('div');
        totalDiv.className = 'info-row';
        totalDiv.innerHTML = `
            <label>Стоимость: ${totalPrice}₽</label>
            <span></span>
        `;
        modalBody.appendChild(totalDiv);

        showModal('viewOrderModal');
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Ошибка при загрузке данных заказа: ' + error.message, 'error');
    }
}

async function editOrder(orderId) {
    try {
        const response = await fetch(`${apiUrl}/orders/${orderId}?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Ошибка при получении данных заказа');
        const order = await response.json();

        const dishesResponse = await fetch(`${apiUrl}/dishes?api_key=${apiKey}`);
        if (!dishesResponse.ok) throw new Error('Ошибка при получении данных блюд');
        const dishes = await dishesResponse.json();

        // Создаем форму и дбавляем ей id
        const modalBody = document.querySelector('#editOrderModal .modal-body');
        modalBody.innerHTML = `
            <form id="edit-order-form">
                <div class="info-row">
                    <label>Дата оформления:</label>
                    <span>${formatDate(order.created_at)}</span>
                </div>
                <div class="info-row">
                    <label>Имя получателя:</label>
                    <input type="text" value="${order.full_name}" name="full_name" required>
                </div>
                <div class="info-row">
                    <label>Адрес доставки:</label>
                    <input type="text" value="${order.delivery_address}" name="delivery_address" required>
                </div>
                <div class="info-row">
                    <label>Тип доставки:</label>
                    <div class="delivery-type-inputs">
                        <label class="radio-label">
                            <input type="radio" name="delivery_type" value="now" 
                                ${order.delivery_type === 'now' ? 'checked' : ''}>
                            Как можно скорее
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="delivery_type" value="by_time"
                                ${order.delivery_type === 'by_time' ? 'checked' : ''}>
                            Ко времени
                        </label>
                    </div>
                </div>
                <div class="info-row">
                    <label>Время доставки:</label>
                    <div class="time-container">
                        <input type="time" 
                               value="${order.delivery_time || ''}" 
                               name="delivery_time"
                               ${order.delivery_type === 'now' ? 'disabled' : ''}>
                    </div>
                </div>
                <div class="info-row">
                    <label>Телефон:</label>
                    <input type="tel" value="${order.phone}" name="phone" required>
                </div>
                <div class="info-row">
                    <label>Email:</label>
                    <input type="email" value="${order.email}" name="email" required>
                </div>
                <div class="comment-container">
                    <label>Комментарий:</label>
                    <textarea name="comment">${order.comment || ''}</textarea>
                </div>
            </form>
            <div class="info-row">
                <label>Состав заказа</label>
            </div>
        `;

        // Добавляем информацию о блюдах
        const dishTypes = [
            { id: 'soup_id', label: 'Суп' },
            { id: 'main_course_id', label: 'Основное блюдо' },
            { id: 'salad_id', label: 'Салат' },
            { id: 'drink_id', label: 'Напиток' },
            { id: 'dessert_id', label: 'Десерт' }
        ];

        dishTypes.forEach(type => {
            if (order[type.id]) {
                const dish = dishes.find(d => d.id === order[type.id]);
                if (dish) {
                    const div = document.createElement('div');
                    div.className = 'info-row';
                    div.innerHTML = `
                        <label>${type.label}:</label>
                        <span>${dish.name} (${dish.price}₽)</span>
                    `;
                    modalBody.appendChild(div);
                }
            }
        });

        // Добавляем стоимость
        const totalPrice = calculateTotalPrice(order, dishes);
        const totalDiv = document.createElement('div');
        totalDiv.className = 'info-row';
        totalDiv.innerHTML = `
            <label>Стоимость: ${totalPrice}₽</label>
            <span></span>
        `;
        modalBody.appendChild(totalDiv);

        // Добавляем обработчики после создания формы
        const form = document.getElementById('edit-order-form');
        form.dataset.orderId = orderId;

        // Добавляем обработчики для радио-кнопок
        const radioButtons = form.querySelectorAll('input[name="delivery_type"]');
        const timeInput = form.querySelector('input[name="delivery_time"]');

        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'by_time') {
                    timeInput.disabled = false;
                    timeInput.required = true;
                    if (!timeInput.value) {
                        timeInput.value = '12:00';
                    }
                } else {
                    timeInput.disabled = true;
                    timeInput.required = false;
                    timeInput.value = '';
                }
            });
        });

        showModal('editOrderModal');
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Ошибка при загрузке данных заказа: ' + error.message, 'error');
    }
}

async function saveOrder() {
    try {
        const form = document.getElementById('edit-order-form');
        if (!form) {
            throw new Error('Форма не найдена');
        }

        const orderId = form.dataset.orderId;
        const formData = new FormData(form);
        const apiKey = 'd70c5ad1-1980-475b-b33a-d68d32f1dad4';
        
        const response = await fetch(`http://lab8-api.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${apiKey}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка при сохранении заказа');
        }

        showNotification('Заказ успешно обновлен', 'success');
        closeModal('editOrderModal');
        loadOrders();
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification(error.message, 'error');
    }
}

async function deleteOrder(orderId) {
    currentOrderId = orderId;
    showModal('deleteOrderModal');
}

async function confirmDelete() {
    try {
        const response = await fetch(
            `${apiUrl}/orders/${currentOrderId}?api_key=${apiKey}`,
            { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка при удалении заказа');
        }

        showNotification('Заказ успешно удален');
        closeModal('deleteOrderModal');
        location.reload(); // Обновляем страницу для отображения изменений
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Ошибка при удалении заказа: ' + error.message, 'error');
    }
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    console.log('Открываю модальное окно:', modalId);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    modal.classList.remove('show');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    console.log('Закрываю модальное окно:', modalId);
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');
    
    notification.style.display = 'block';
    notification.classList.remove('hidden');
    notification.classList.add('show');
    
    messageElement.textContent = message;
    notification.className = `notification show ${type}`;
    
    console.log('Показываю уведомление:', message);
    
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hidden');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 3000);
}

// Оновляем CSS для модальных окон
const styleSheet = document.createElement('style');
styleSheet.textContent = `
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}

.modal.show {
    display: flex !important;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: modalFadeIn 0.3s;
}

@keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 4px;
    z-index: 1001;
    animation: fadeIn 0.3s;
    display: none;
}

.notification.success {
    background-color: #28a745;
    color: white;
}

.notification.error {
    background-color: #dc3545;
    color: white;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
}

.hidden {
    display: none !important;
}
`;

document.head.appendChild(styleSheet);

// Добавляем обработчики закрытия модальных окон
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Обработчик изменения типа доставки
    const deliveryTypeInputs = document.querySelectorAll('input[name="delivery_type"]');
    const timeInput = document.getElementById('edit-time');
    
    deliveryTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            timeInput.disabled = input.value !== 'by_time';
            if (input.value === 'by_time') {
                timeInput.required = true;
            } else {
                timeInput.required = false;
                timeInput.value = '';
            }
        });
    });
});

// Обработчик изменения типа доставки
function handleDeliveryTypeChange(event) {
    const timeInput = document.querySelector('input[name="delivery_time"]');
    if (event.target.value === 'by_time') {
        timeInput.disabled = false;
        timeInput.required = true;
    } else {
        timeInput.disabled = true;
        timeInput.required = false;
        timeInput.value = '';
    }
}

// Добавляем обработчики после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const deliveryTypeInputs = document.querySelectorAll('input[name="delivery_type"]');
    deliveryTypeInputs.forEach(input => {
        input.addEventListener('change', handleDeliveryTypeChange);
    });
}); 