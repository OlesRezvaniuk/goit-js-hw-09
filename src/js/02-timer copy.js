// Імпортуємо бібліотеки
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Отримуємо доступ до об'єктів
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
refs.startBtn.style.background = 'rgb(214, 235, 250)'; // Змінюємо колір некативної кнопки
let startButton = false; // Створюємо змінну для неможливості click більше 1 разу на кнопку

// Створюємо змінну, бібліотека flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Створюємо перевірку щоб не можна було вибрати нову дату коли таймер уже включенй
    if (refs.secondsEl.textContent !== '00') {
      return;
    }

    //  Якщо нова дата більша за теперишню то пропускаєм
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future'); // Підключаємо бібліотеку вспливаючих помилок
      return;
    }
    //Змінюємо стиль кнопки при виконанні умови
    refs.startBtn.style.border = '1px solid grey';
    refs.startBtn.style.borderBottom = '3px solid grey';

    // Створюємо функцію
    function setDate() {
      let selectedDate = selectedDates[0]; // Створюємо змінну для зберігання вибраної дати
      let now = new Date(); // Створюємо змінну для зберігання теперішньої дати
      let ms = selectedDate - now; // Створюємо змінну яка визначає різницю часу(дати)

      // Визначаємо формат часу, використовуємо метод .padStart(), якщо число скл. з 1 цифри, добавляєм спереді 0.
      const days = addLeadingZero(Math.floor(ms / 1000 / 60 / 60 / 24));
      const hours = addLeadingZero(Math.floor(ms / 1000 / 60 / 60) % 24);
      const minutes = addLeadingZero(Math.floor(ms / 1000 / 60) % 60);
      const seconds = addLeadingZero(Math.floor(ms / 1000) % 60);

      // Змінюємо вміст елемента на новий
      refs.daysEl.innerHTML = days;
      refs.hoursEl.innerHTML = hours;
      refs.minutesEl.innerHTML = minutes;
      refs.secondsEl.innerHTML = seconds;

      // Якщо значення відповідає '00' то видали інтервал
      if (
        refs.daysEl.textContent === '00' &&
        refs.hoursEl.textContent === '00' &&
        refs.minutesEl.textContent === '00' &&
        refs.secondsEl.textContent === '00'
      ) {
        clearInterval(timerId); // Видаляємо інтервал
      }
    }
    setDate(); // Викликаємо функцію

    // Підключаємо слухача до кнопки,
    refs.startBtn.addEventListener('click', () => {
      // Перевірка чи кнопка активна, якщо ативна то виходим
      if (startButton) {
        return;
      }
      startButton = true;
      const timerId = setInterval(setDate, 1000);
      refs.startBtn.style.background = 'rgb(126, 197, 245)'; // Змінюємо колір активної кнопки
    });
  },
};

flatpickr(refs.inputDate, options);
// Функція, якщо меньше чим 10 днів то спереді добавляєм 0
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// console.log(options);
