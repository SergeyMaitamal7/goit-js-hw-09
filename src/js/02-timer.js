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
    const handleClick = () => {
      setInterval(() => {
        const deltaMs = selectedDates[0].getTime() - new Date().getTime();

        if (deltaMs > 0) {
          const counter = convertMs(deltaMs);

          refs.daysEl.textContent =
            counter.days < 10 ? `0${counter.days}` : `${counter.days}`;
          refs.hoursEl.textContent =
            counter.hours < 10 ? `0${counter.hours}` : `${counter.hours}`;
          refs.minutesEl.textContent =
            counter.minutes < 10 ? `0${counter.minutes}` : `${counter.minutes}`;
          refs.secondsEl.textContent =
            counter.seconds < 10 ? `0${counter.seconds}` : `${counter.seconds}`;
        }

        if (deltaMs <= 0) {
          refs.button.disabled = true;
        }
      }, 1000);
    };
    refs.button.addEventListener('click', handleClick);
  },
};

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
