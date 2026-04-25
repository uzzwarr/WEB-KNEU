document.addEventListener('DOMContentLoaded', () => {

    //  ЛОГІКА ДЛЯ ДИНАМІЧНИХ ЦИТАТ

    const infoArray = [
        "«Борітеся — поборете, вам Бог помагає!» — Тарас Шевченко",
        "«Я є народ, якого правди сила ніким звойована ще не була.» — Василь Симоненко",
        "«Лиш боротись — значить жить!» — Іван Франко",
        "«Все минає — і краса, і слава, лише любов не минає.» — Леся Українка",
        "«Народ мій є! Народ мій завжди буде!» — Василь Стус",
        "«Мова росте разом із душею народу.» — Іван Огієнко",
        "«Ти знаєш, що ти — людина? Ти знаєш про це чи ні?» — Василь Симоненко",
        "«Хто матір забуває — того Бог карає.» — Тарас Шевченко",
        "«І все на світі треба пережити, і кожен фініш — це, по суті, старт.» — Ліна Костенко",
        "«Поезія — це завжди неповторність, якийсь безсмертний дотик до душі.» — Ліна Костенко",
        "«Можеш не вірити в себе. Головне, вір в мене! Вір в мою віру в тебе.» — Каміна"
    ];

    const quoteElement = document.getElementById('dynamic-quote');

    function updateQuote() {
        if (quoteElement) {
            const randomIndex = Math.floor(Math.random() * infoArray.length);
            // Плавна зміна цитати
            quoteElement.style.opacity = 0;
            setTimeout(() => {
                quoteElement.textContent = infoArray[randomIndex];
                quoteElement.style.opacity = 1;
            }, 500); // 0.5s на зникнення
        }
    }

    // Оновити цитату одразу при завантаженні
    updateQuote();
    
    // Оновлювати цитату кожні 5 секунд
    setInterval(updateQuote, 5000);


    // ЛОГІКА ДОДАВАННЯ В КОШИК 
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.album-card, .product-page .product-details');
            if (!card) return; // Якщо не знайшли батьківський елемент

            const product = {
                id: card.dataset.id,
                title: card.dataset.title,
                price: parseFloat(card.dataset.price),
                img: card.dataset.img || 'https://placehold.co/80x80', // Запасне зображення
                quantity: 1
            };

            // Отримуємо поточний кошик з localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Перевіряємо, чи є вже такий товар у кошику
            const existingProductIndex = cart.findIndex(item => item.id === product.id);

            if (existingProductIndex > -1) {
                // Якщо є, збільшуємо кількість
                cart[existingProductIndex].quantity += 1;
            } else {
                // Якщо немає, додаємо новий товар
                cart.push(product);
            }

            // Зберігаємо оновлений кошик назад у localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Даємо користувачу зворотний зв'язок
            button.textContent = 'Додано!';
            setTimeout(() => {
                button.innerHTML = e.target.closest('.album-card') 
                    ? `Додати в кошик (${product.price} ₴)` 
                    : 'Додати в кошик';
            }, 1500);
        });
    });


    //  ЛОГІКА ЗБІЛЬШЕННЯ ЗОБРАЖЕННЯ 
    const productImage = document.querySelector('.product-page .product-image img');

    if (productImage) {
        productImage.style.transition = 'transform 0.3s ease';

        // Обробник OnMouseOver: збільшуємо зображення
        productImage.addEventListener('mouseover', () => {
            productImage.style.transform = 'scale(1.05)';
            productImage.style.cursor = 'zoom-in';
        });

        // Обробник OnMouseOut: повертаємо до звичайного розміру
        productImage.addEventListener('mouseout', () => {
            productImage.style.transform = 'scale(1.0)';
        });
    }

    // ЛОГІКА ГАЛЕРЕЇ ЗОБРАЖЕНЬ З RADIO-КНОПКАМИ 
    const imageChoiceRadios = document.querySelectorAll('input[name="image-choice"]');
    const imageSizeRadios = document.querySelectorAll('input[name="image-size"]');
    
    // Знаходимо єдине зображення для показу
    const imgDisplay = document.getElementById('gallery-image-display');

    // Масив розмірів для циклічної зміни при кліку
    const sizes = ['small', 'original', 'large'];
    let currentSizeIndex = 1; // Починаємо з 'original'

    // Функція, яка оновлює зображення на основі ОБИДВОХ виборів
    function updateGalleryImage() {
        if (!imgDisplay) return; // Виходимо, якщо зображення не знайдено

        // Отримуємо поточні обрані значення
        const selectedImageRadio = document.querySelector('input[name="image-choice"]:checked');
        const selectedSizeRadio = document.querySelector('input[name="image-size"]:checked');

        if (!selectedImageRadio || !selectedSizeRadio) return;

        const selectedImage = selectedImageRadio.value;
        const selectedSize = selectedSizeRadio.value;

        // Перевіряємо, чи треба ховати зображення ("повернення до вихідного стану")
        if (selectedImage === 'none') {
            imgDisplay.style.display = 'none';
            imgDisplay.src = '';
            return;
        }

        // Якщо зображення обрано, показуємо його і встановлюємо src
        imgDisplay.style.display = 'block';
        imgDisplay.src = selectedImage;
        imgDisplay.alt = 'Обране зображення альбому';

        // Скидаємо ВСІ стилі/атрибути перед застосуванням нових
        imgDisplay.style.maxWidth = '';
        imgDisplay.style.width = '';
        imgDisplay.style.height = '';
        imgDisplay.removeAttribute('width');
        imgDisplay.removeAttribute('height');

        // Застосовуємо розміри залежно від вибору
        switch (selectedSize) {
            case 'small':
                // Зменшена копія - використовуємо атрибути width і height
                imgDisplay.setAttribute('width', '100');
                imgDisplay.setAttribute('height', '100');
                imgDisplay.style.objectFit = 'cover';
                break;
            case 'original':
                // Оригінальний розмір з обмеженням
                imgDisplay.style.maxWidth = '300px';
                imgDisplay.style.width = 'auto';
                imgDisplay.style.height = 'auto';
                imgDisplay.style.objectFit = 'contain';
                break;
            case 'large':
                // Збільшена копія - використовуємо атрибути width і height
                imgDisplay.setAttribute('width', '400');
                imgDisplay.setAttribute('height', '400');
                imgDisplay.style.objectFit = 'cover';
                break;
        }
    }

    // Призначаємо обробник подій 'change' для КОЖНОЇ radio-кнопки
    imageChoiceRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateGalleryImage();
            // Скидаємо індекс розміру при зміні зображення
            const selectedSizeRadio = document.querySelector('input[name="image-size"]:checked');
            if (selectedSizeRadio) {
                currentSizeIndex = sizes.indexOf(selectedSizeRadio.value);
            }
        });
    });

    imageSizeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateGalleryImage();
            // Оновлюємо поточний індекс розміру
            currentSizeIndex = sizes.indexOf(radio.value);
        });
    });

    if (imgDisplay) {
        imgDisplay.style.cursor = 'pointer';
        imgDisplay.style.transition = 'all 0.3s ease-in-out';
        
        imgDisplay.addEventListener('click', () => {
            // Перевіряємо, чи зображення видиме
            if (imgDisplay.style.display === 'none') return;

            // Переходимо до наступного розміру в циклі
            currentSizeIndex = (currentSizeIndex + 1) % sizes.length;
            const newSize = sizes[currentSizeIndex];

            // Знаходимо відповідну radio-кнопку і активуємо її
            const radioToSelect = document.querySelector(`input[name="image-size"][value="${newSize}"]`);
            if (radioToSelect) {
                radioToSelect.checked = true;
                // Викликаємо оновлення зображення
                updateGalleryImage();
            }
        });
    }

    updateGalleryImage();


    // ЛОГІКА НАВІГАЦІЇ ЧЕРЕЗ <SELECT> 
    const pageSelect = document.getElementById('page-select');

    if (pageSelect) {
        
        
        function handlePageChange() {
            const selectedPage = this.value; 
            if (selectedPage) { 
                window.location.href = selectedPage;
            }
        }

        
        pageSelect.addEventListener('change', handlePageChange);
    }

}); 