import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const button = document.querySelector('button');
const input = document.querySelector('input#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

button.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      if (!button.getAttribute('disabled')) {
        button.setAttribute('disabled', true);
      }
    } else {
      button.removeAttribute('disabled');
      button.addEventListener('click', () => {
        let interval = setInterval(() => {
          let selected = Date.parse(selectedDates[0]);
          let difference = selected - Date.parse(new Date());
          days.textContent = addLeadingZero(`${convertMs(difference).days}`);
          hours.textContent = addLeadingZero(`${convertMs(difference).hours}`);
          minutes.textContent = addLeadingZero(
            `${convertMs(difference).minutes}`
          );
          seconds.textContent = addLeadingZero(
            `${convertMs(difference).seconds}`
          );
          if (difference < 1000) {
            clearInterval(interval);
          }
        }, 1000);
      });
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
