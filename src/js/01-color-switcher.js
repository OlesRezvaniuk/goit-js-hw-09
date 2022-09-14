const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('body > button:nth-child(2)'),
  btnStop: document.querySelector('body > button:nth-child(3)'),
};
const DELAY = 1000;
// refs.btnStop.disabled = true;
refs.btnStop.disabled = true;
let intervalColor = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStart.addEventListener('click', () => {
  btnDissabled(refs.btnStop, refs.btnStart);
  intervalColor = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
});

refs.btnStop.addEventListener('click', () => {
  btnDissabled(refs.btnStart, refs.btnStop);
  clearInterval(intervalColor);
});

function btnDissabled(unDissabled, dissabled) {
  unDissabled.disabled = false;
  dissabled.disabled = true;
}
