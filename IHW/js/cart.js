document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-list');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartTotalElement = document.getElementById('cart-total');
    const cartContainer = document.querySelector('.cart-container'); // Весь контейнер

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        if (!cartItemsContainer) return; // Виходимо, якщо ми не на сторінці кошика

        cartItemsContainer.innerHTML = ''; // Очищуємо список
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<h2>Ваш кошик порожній</h2>';
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            // Зберігаємо id та price в data-атрибутах для легкого доступу
            itemElement.dataset.id = item.id;
            itemElement.dataset.price = item.price;

            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <p>Ціна: ${item.price} ₴</p>
                </div>
                <div class="item-quantity">
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                </div>
                <div class="item-price" id="item-subtotal-${item.id}">
                    ${(item.price * item.quantity).toFixed(2)} ₴
                </div>
                <button class="item-remove" data-id="${item.id}">&times;</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        addEventListeners();
        updateTotals();
    }

    function addEventListeners() {
        // Оновлення кількості
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.closest('.cart-item').dataset.id;
                const newQuantity = parseInt(e.target.value);
                updateQuantity(id, newQuantity);
            });
        });

        // Видалення товару
        document.querySelectorAll('.item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                removeFromCart(id);
            });
        });
    }

    function updateQuantity(id, quantity) {
        cart = cart.map(item => {
            if (item.id === id) {
                item.quantity = quantity;
            }
            return item;
        });
        saveCart();
        
        // Оновлюємо підсумок для конкретного товару
        const itemElement = document.querySelector(`.cart-item[data-id="${id}"]`);
        const price = parseFloat(itemElement.dataset.price);
        const itemSubtotalElement = document.getElementById(`item-subtotal-${id}`);
        itemSubtotalElement.textContent = `${(price * quantity).toFixed(2)} ₴`;

        updateTotals();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart(); // Перемальовуємо кошик
    }

    function updateTotals() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const shipping = 0; // Наразі доставка безкоштовна
        const total = subtotal + shipping;
        
        if (cartSubtotalElement && cartTotalElement) {
            cartSubtotalElement.textContent = `${subtotal.toFixed(2)} ₴`;
            cartTotalElement.textContent = `${total.toFixed(2)} ₴`;
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Початкове завантаження кошика
    renderCart();
});