import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayForm = document.querySelector('.form');
delayForm.addEventListener('submit', getPromises);

function getPromises(event) {
  let step = Number(this.step.value);
  let amount = Number(this.amount.value);
  let delay = Number(this.delay.value);
  let count = 0;
  let delayForEach = delay - step;

  event.preventDefault();

  const generatorCounter = setInterval(() => {
    count += 1;
    delayForEach += step;

    createPromise(count, delayForEach).then(showSucces).catch(showError);

    if (count === amount) {
      clearInterval(generatorCounter);
    }
  }, step);
}

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
