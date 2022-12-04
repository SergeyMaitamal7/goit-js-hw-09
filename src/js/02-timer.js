import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  button: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds'),
};

let timerId = null;
refs.button.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() < 0) {
      window.alert('Please choose a date in the future');
    }
    refs.button.disabled = false;

    refs.button.addEventListener('click', () => {
      timer(selectedDates);
      refs.button.disabled = true;
    });
  },
};

function timer(today) {
  timerId = setInterval(() => {
    console.log('hello');
    const deltaMs = today[0].getTime() - new Date().getTime();
    if (deltaMs > 0) {
      addLeadingZero(deltaMs);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  const time = convertMs(value);
  refs.daysEl.textContent = time.days.toString().padStart(2, '0');
  refs.hoursEl.textContent = time.hours.toString().padStart(2, '0');
  refs.minutesEl.textContent = time.minutes.toString().padStart(2, '0');
  refs.secondsEl.textContent = time.seconds.toString().padStart(2, '0');
}

flatpickr(refs.input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
