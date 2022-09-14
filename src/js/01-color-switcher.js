function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
// Отримуємо доступ до боді
// Створюємо змінні:
//    intervalHex - для перевірки умови початку виконання інтервалу
//    intervalId - для зберігання та видалення інтервалу
//  додатково створена змінна для зберігання значення проміжку
const body = document.body;
const DELAY = 1000;
//Створюємо слухача на кнопку старт
// Підключаємо стилі при активній кнопці старт
// Пишемо перевірку для доступу до функції, спочатку вона false,
// коли нажимаємо на кнопку значення стає true і пропускає
// Створюємо інтервал, в тілі вписуємо що робити, ставим проміжок
refs.startBtn.addEventListener('click', () => {
  btnStart();
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
});
// Створюємо слухача який на кнопку ремув зупиняє інтервал
// Добавляєм intervalHex зі значенням false, для змоги запуску інтервалу
// Підключаємо стиль для активної кнопки видалити
refs.stopBtn.addEventListener('click', () => {
  btnStop(intervalId);
});

function btnStart() {
  refs.startBtn.disabled = 'disabled';
  refs.stopBtn.removeAttribute('disabled');
}

function btnStop(intervalId) {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.disabled = 'disabled';
  clearInterval(intervalId);
}
