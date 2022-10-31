const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let interval;

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute("disabled")
  interval = setInterval(changeBodyColor, 1000);
});
stopBtn.addEventListener('click', () => {
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
  clearInterval(interval);
});

function changeBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
