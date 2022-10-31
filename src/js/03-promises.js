import Notiflix from 'notiflix';

const delayTime = document.querySelector('[name = delay]');
const stepTime = document.querySelector('[name = step]');
const quantity = document.querySelector('[name = amount]');
const form = document.querySelector('.form');

let delay;
let step;
let amount;

form.addEventListener('input', () => {
  delay = +delayTime.value;
  step = +stepTime.value;
  amount = +quantity.value;
});

form.addEventListener('submit', event => {
  event.preventDefault();
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        }, delay);
      });
    delay += step;
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
