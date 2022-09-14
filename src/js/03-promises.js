import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Отримуємо достоуп до елементу форми
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector(
    'body > form > label:nth-child(1) > input[type=number]'
  ),
  step: document.querySelector(
    'body > form > label:nth-child(2) > input[type=number]'
  ),
  amount: document.querySelector(
    'body > form > label:nth-child(3) > input[type=number]'
  ),
  submitBtn: document.querySelector('button'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();
  const firstDelay = Number(refs.delay.value);
  const stepDelay = Number(refs.step.value);
  const position = Number(refs.amount.value);
  let promiseDelay = 0;

  for (let i = 1; i <= position; i += 1) {
    if (i === 1) {
      promiseDelay = firstDelay;
    } else if (i >= 2) {
      promiseDelay += stepDelay;
    }
    console.log(promiseDelay);
    createPromise(position, promiseDelay).then(onSucces).catch(onError);
  }
}

function onSucces({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

refs.form.addEventListener('submit', onFormSubmit);
