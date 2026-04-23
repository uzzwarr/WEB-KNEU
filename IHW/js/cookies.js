// js/cookies.js

document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const colorButtons = document.querySelectorAll('.color-btn');
    
    // 1. Функції для роботи з Cookie
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // 2. Функція зміни теми (Змінює CSS змінну на льоту)
    function changeTheme(color) {
        // Це магія: ми змінюємо значення --spotify-green для всього сайту
        document.documentElement.style.setProperty('--spotify-green', color);
    }

    // 3. Перевірка при завантаженні
    const savedColor = getCookie('user_theme_color');
    const isConsentGiven = getCookie('cookie_consent');

    if (savedColor) {
        // Якщо колір збережений, застосовуємо його одразу
        changeTheme(savedColor);
        
        // Підсвічуємо активну кнопку в банері (якщо він відкриється)
        colorButtons.forEach(btn => {
            if (btn.dataset.color === savedColor) btn.classList.add('active');
        });
    }

    // Якщо згоди ще не було, показуємо банер
    if (!isConsentGiven) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // 4. Обробка кліків на кольорові кнопки (Попередній перегляд)
    colorButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Знімаємо активний клас з усіх
            colorButtons.forEach(b => b.classList.remove('active'));
            // Додаємо активний обраному
            e.target.classList.add('active');

            const selectedColor = e.target.dataset.color;
            
            // Застосовуємо тему ВІЗУАЛЬНО (поки що без збереження в кукі, щоб юзер бачив ефект)
            changeTheme(selectedColor);
        });
    });

    // 5. Обробка кнопки "Зберегти"
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            // Знаходимо активний колір (або беремо стандартний зелений)
            const activeBtn = document.querySelector('.color-btn.active');
            const colorToSave = activeBtn ? activeBtn.dataset.color : '#1DB954';

            // Зберігаємо в Cookie на 30 днів
            setCookie('user_theme_color', colorToSave, 30);
            setCookie('cookie_consent', 'true', 30);

            // Ховаємо банер
            cookieBanner.classList.remove('show');
            
            // Невелика анімація кнопки для підтвердження
            acceptBtn.textContent = "Збережено! 👌";
            setTimeout(() => {
               cookieBanner.style.display = 'none'; 
            }, 500);
        });
    }
});