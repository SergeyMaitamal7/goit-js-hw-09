const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', buttonSubmit);

function buttonSubmit(event) {
  event.preventDefault();

  const firstDelay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);

  for (let i = 0; i <= amount; i += 1) {
    const delay = firstDelay + step * [i];

    createPromise([i], delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${i} in ${delay}ms`);
      });
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Напиши скрипт, который при сабмите формы вызывает
// функцию createPromise(position, delay) столько раз,
// сколько ввели в поле amount. При каждом вызове передай ей номер
// создаваемого промиса (position) и задержку учитывая введенную пользователем
// первую задержку (delay) и шаг (step).

// Дополни код функции createPromise так, чтобы она возвращала один промис,
//  который выполянется или отклоняется через delay времени. Значением промиса
//  должен быть объект, в котором будут свойства position и delay со значениями
//  одноименных параметров. Используй начальный код функции для выбора того, что
//   нужно сделать с промисом - выполнить или отклонить.
