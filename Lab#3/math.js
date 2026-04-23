const num1Input = document.getElementById('number1');
const num2Input = document.getElementById('number2');
const calculateBtn = document.getElementById('calculateButton');
const resultsDiv = document.getElementById('results');

// обробник події для кнопки "Обчислити"
calculateBtn.addEventListener('click', () => {
  // значення з полів вводу і перетворюємо їх у числа
  const a = parseFloat(num1Input.value);
  const b = parseFloat(num2Input.value);

  // Перевірка
  if (isNaN(a) || isNaN(b)) {
    resultsDiv.innerHTML = "<p style='color: #ff6666;'>Будь ласка, введіть обидва числа коректно.</p>";
    return; 
  }

  // обчислення
  const sum = a + b;
  const diff = a - b;
  const mult = a * b;
  let divResult;

  // обробка випадоку ділення на нуль
  if (b === 0) {
    divResult = "Ділення на нуль неможливе";
  } else {
    divResult = a / b;
  }

  // HTML-код з результатами і виводимо його на сторінку
  resultsDiv.innerHTML = `
    <p><strong>Сума:</strong> ${sum}</p>
    <p><strong>Різниця:</strong> ${diff}</p>
    <p><strong>Множення:</strong> ${mult}</p>
    <p><strong>Ділення:</strong> ${divResult}</p>
  `;
});