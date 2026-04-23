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
  "«Поезія — це завжди неповторність, якийсь безсмертний дотик до душі.» — Ліна Костенко"
];

const infoElement = document.getElementById("info");
infoElement.style.opacity = 0;
infoElement.style.transition = "opacity 2s ease";

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * infoArray.length);
  const randomInfo = infoArray[randomIndex];

  infoElement.style.opacity = 0;

  setTimeout(() => {
    infoElement.textContent = randomInfo;
    infoElement.style.opacity = 1;
  }, 700);
}

showRandomQuote();

setInterval(showRandomQuote, 10000);
