const pageBody = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let colorTimer = null;

startBtn.addEventListener('click', () => {
  blockBtns(stopBtn, startBtn);
  pageBody.style.backgroundColor = getRandomHexColor();
  colorTimer = setInterval(() => {
    pageBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(colorTimer);
  blockBtns(startBtn, stopBtn);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function blockBtns(undisabledBtn, disabledBtn) {
  disabledBtn.disabled = true;
  undisabledBtn.disabled = false;
}
