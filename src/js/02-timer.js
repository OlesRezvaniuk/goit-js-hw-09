// const flatpickr = require("flatpickr");
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/confetti.css');

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerStartBtn = document.querySelector('button[data-start]');
const calendarInput = document.querySelector('#datetime-picker');

const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timeMinutes = document.querySelector('span[data-minutes]');
const timerseconds = document.querySelector('span[data-seconds]');

timerStartBtn.disabled = true;

let myCalendar = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let counterValue = selectedDates[0].getTime();

    if (counterValue < new Date()) {
      timerStartBtn.disabled = true;
      Notify.failure('Please choose a date in the future', { width: '280px' });
    } else {
      timerStartBtn.disabled = false;
    }
  },
});

timerStartBtn.addEventListener('click', () =>
  coundown(myCalendar.selectedDates[0] - new Date())
);

function coundown(time) {
  switchInpDisable(true);

  const coundownTimer = setInterval(() => {
    time -= 1000;

    let coundownData = convertMs(time);
    updateTimerElems(coundownData);

    if (time < 1000) {
      clearInterval(coundownTimer);
      switchInpDisable(false);
    }
  }, 1000);
}

function updateTimerElems(delay) {
  timerDays.textContent = delay.days;
  timerHours.textContent = delay.hours;
  timeMinutes.textContent = delay.minutes;
  timerseconds.textContent = delay.seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function switchInpDisable(value) {
  timerStartBtn.disabled = value;
  calendarInput.disabled = value;
}
