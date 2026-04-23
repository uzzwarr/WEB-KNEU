document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('survey-form');
    const feedbackForm = document.getElementById('feedback-form');
    const resetBtn = document.getElementById('reset-btn');
    const resultDisplay = document.getElementById('result-display');
    const successMessage = document.getElementById('success-message');
    const name = document.getElementById('name').value.trim();
    
    document.cookie = "userName=" + encodeURIComponent(name) + "; max-age=" + (7*24*60*60) + "; path=/";

    // Перевіряємо, чи існують елементи (якщо сторінка не survey.html, виходимо)
    if (!surveyForm || !feedbackForm) {
        return;
    }

    // ============================================
    // ФОРМА 1: ВАЛІДАЦІЯ ТА ОБРОБКА ОПИТУВАННЯ
    // ============================================

    /**
     * Функція валідації форми опитування
     * Перевіряє всі обов'язкові поля
     */
    function validateSurveyForm() {
        let isValid = true;

        // Очищаємо попередні помилки
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
        });

        // 1. Перевірка імені (мінімум 2 символи)
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            document.getElementById('name').closest('.form-group').classList.add('has-error');
            isValid = false;
        }

        // 2. Перевірка email (правильний формат)
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email').closest('.form-group').classList.add('has-error');
            isValid = false;
        }

        // 3. Перевірка radio (частота покупок) - обов'язково один вибраний
        const frequency = document.querySelector('input[name="frequency"]:checked');
        if (!frequency) {
            document.querySelector('input[name="frequency"]').closest('.form-group').classList.add('has-error');
            isValid = false;
        }

        // 4. Перевірка checkbox (жанри) - хоча б один обраний
        const genres = document.querySelectorAll('input[name="genres"]:checked');
        if (genres.length === 0) {
            document.querySelector('input[name="genres"]').closest('.form-group').classList.add('has-error');
            isValid = false;
        }

        // 5. Перевірка textarea (коментарі) - мінімум 10 символів
        const comments = document.getElementById('comments').value.trim();
        if (comments.length < 10) {
            document.getElementById('comments').closest('.form-group').classList.add('has-error');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Обробка відправки форми опитування
     */
    surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Виконуємо валідацію
        if (!validateSurveyForm()) {
            // Прокручуємо до першої помилки
            const firstError = document.querySelector('.form-group.has-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Збираємо дані з форми
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const frequency = document.querySelector('input[name="frequency"]:checked').value;
        const genres = Array.from(document.querySelectorAll('input[name="genres"]:checked'))
            .map(cb => cb.value);
        const comments = document.getElementById('comments').value.trim();

        // Словники для перекладу значень
        const frequencyTexts = {
            'weekly': 'Щотижня',
            'monthly': 'Щомісяця',
            'rarely': 'Рідко',
            'first-time': 'Це моя перша покупка'
        };

        const genreTexts = {
            'rock': 'Рок',
            'pop': 'Поп',
            'indie': 'Інді',
            'electronic': 'Електронна музика',
            'jazz': 'Джаз',
            'ukrainian': 'Українська музика'
        };

        // Формуємо текст результату для відображення
        const resultText = `╔════════════════════════════════════════════╗
║     РЕЗУЛЬТАТИ ОПИТУВАННЯ VINILLAGANN      ║
╚════════════════════════════════════════════╝

👤 Ім'я респондента: ${name}
📧 Email: ${email}

📊 ЧАСТОТА ПОКУПОК ВІНІЛУ:
   ${frequencyTexts[frequency]}

🎵 УЛЮБЛЕНІ МУЗИЧНІ ЖАНРИ:
   ${genres.map(g => '• ' + genreTexts[g]).join('\n   ')}

💭 ПОБАЖАННЯ ТА КОМЕНТАРІ:
   ${comments}

📅 Дата заповнення: ${new Date().toLocaleString('uk-UA')}

═══════════════════════════════════════════════
Дякуємо за участь в опитуванні! 🎶
Ваша думка допоможе нам покращити асортимент.
`;

        // Відображаємо результат у textarea форми 2
        resultDisplay.value = resultText;
        
        // Показуємо повідомлення про успіх
        successMessage.style.display = 'block';

        // Плавно прокручуємо до результатів
        setTimeout(() => {
            resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);

        // Додаємо анімацію до textarea
        resultDisplay.style.backgroundColor = 'rgba(29, 185, 84, 0.1)';
        setTimeout(() => {
            resultDisplay.style.backgroundColor = '';
        }, 1000);
    });

    /**
     * Кнопка очищення форми
     */
    resetBtn.addEventListener('click', () => {
        // Скидаємо всі поля форми
        surveyForm.reset();
        
        // Видаляємо всі помилки
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
        });

        // Ховаємо повідомлення про успіх
        successMessage.style.display = 'none';

        // Очищаємо результати
        resultDisplay.value = 'Тут з\'являться результати після заповнення опитування...';

        // Прокручуємо до початку форми
        surveyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // ============================================
    // ФОРМА 2: ВІДПРАВЛЕННЯ НА EMAIL
    // ============================================

    /**
     * Обробка відправки форми зворотного зв'язку
     * Відправляє результати на email через Web3Forms API
     */
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const resultText = resultDisplay.value;

        // Перевірка, чи заповнена форма опитування
        if (resultText === 'Тут з\'являться результати після заповнення опитування...') {
            alert('⚠️ Спочатку заповніть форму опитування вище!');
            surveyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        // Показуємо індикатор завантаження
        const submitButton = feedbackForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = '⏳ Відправка...';

        try {
            // Відправляємо через Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'c8e8d732-db55-4d9b-8dfe-152b7fc6e77f', // Тимчасовий ключ - потрібно замінити
                    subject: 'Результати опитування VinilLagann',
                    from_name: 'VinilLagann Survey',
                    to_email: 'uzzwarr717@gmail.com',
                    message: resultText
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('✅ Результати успішно відправлено!\n\nДякуємо за зворотній зв\'язок!');
                // Очищаємо форму після успішної відправки
                resultDisplay.value = 'Тут з\'являться результати після заповнення опитування...';
                successMessage.style.display = 'none';
            } else {
                throw new Error(data.message || 'Помилка відправки');
            }
        } catch (error) {
            console.error('Помилка відправки:', error);
            alert('❌ Помилка відправки.\n\nСпробуйте:\n1. Перевірити інтернет-з\'єднання\n2. Спробувати пізніше\n3. Скопіювати результати вручну');
        } finally {
            // Повертаємо кнопку в початковий стан
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // ============================================
    // ДОДАТКОВІ ФУНКЦІЇ
    // ============================================

    /**
     * Автоматичне видалення помилок при введенні
     */
    
    // Для текстових полів
    document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup && formGroup.classList.contains('has-error')) {
                formGroup.classList.remove('has-error');
            }
        });
    });

    // Для radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const formGroup = radio.closest('.form-group');
            if (formGroup && formGroup.classList.contains('has-error')) {
                formGroup.classList.remove('has-error');
            }
        });
    });

    // Для checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const formGroup = checkbox.closest('.form-group');
            if (formGroup && formGroup.classList.contains('has-error')) {
                // Перевіряємо, чи є хоча б один обраний checkbox
                const checkedBoxes = formGroup.querySelectorAll('input[type="checkbox"]:checked');
                if (checkedBoxes.length > 0) {
                    formGroup.classList.remove('has-error');
                }
            }
        });
    });

    /**
     * Підрахунок символів для textarea
     */
    const commentsTextarea = document.getElementById('comments');
    if (commentsTextarea) {
        const commentsLabel = commentsTextarea.previousElementSibling;
        
        commentsTextarea.addEventListener('input', () => {
            const length = commentsTextarea.value.trim().length;
            const originalText = 'Що б ви хотіли бачити в нашому асортименті? *';
            
            if (length > 0) {
                commentsLabel.textContent = `${originalText} (${length} символів)`;
            } else {
                commentsLabel.textContent = originalText;
            }
        });
    }

    console.log('✅ survey.js завантажено успішно!');
});