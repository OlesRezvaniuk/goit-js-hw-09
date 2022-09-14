import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayForm = document.querySelector('.form'); // Отримуємо доступ до елемента форми
delayForm.addEventListener('submit', getPromises); // Створюємо слухача на формі

//Створюємо функцію яка викликає проміси
function getPromises(event) {
  let step = Number(this.step.value);
  let amount = Number(this.amount.value);
  let delay = Number(this.delay.value);
  let count = 0;
  let delayForEach = delay - step;

  event.preventDefault();

  const promiseGen = setInterval(() => {
    count += 1;
    delayForEach += step;

    createPromise(count, delayForEach).then(showSucces).catch(showError);

    if (count === amount) {
      clearInterval(promiseGen);
    }
  }, step);
}
// Створюємо функцію яка повертає новий проміс з затримкою
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function showSucces(value) {
  Notify.success(value);
}
function showError(error) {
  Notify.failure(error);
}
