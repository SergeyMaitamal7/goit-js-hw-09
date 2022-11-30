function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const backgroundColorBody = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

buttonStop.setAttribute('disabled', true);
let timer = null;

buttonStart.addEventListener('click', () => {
  timer = setInterval(() => {
    backgroundColorBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStop.disabled = false;
  buttonStart.disabled = true;
});

buttonStop.addEventListener('click', () => {
  clearInterval(timer);
  buttonStop.disabled = true;
  buttonStart.disabled = false;
});

// Напиши скрипт, который после нажатия кнопки «Start»,
// раз в секунду меняет цвет фона <body> на случайное значение
// используя инлайн стиль. При нажатии на кнопку «Stop»,
// изменение цвета фона должно останавливаться.

// Учти, на кнопку «Start» можно нажать бесконечное количество раз.
// Сделай так, чтобы пока изменение темы запушено,
// кнопка «Start» была не активна (disabled).
