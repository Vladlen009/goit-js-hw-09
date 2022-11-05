import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.target;

  const delayTime = Number(delay.value);
  const stepTime = Number(step.value);
  const countPromises = Number(amount.value);

  buildPromises(delayTime, stepTime, countPromises);
}

function buildPromises(delayTime, stepTime, amount) {
  for (let i = 1; i <= amount; i += 1) {
    let time = delayTime + stepTime * (i - 1);

    createPromise(i, time)
      .then(() => Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${time}ms`))
      .catch(() => Notiflix.Notify.success(`❌ Rejected promise ${i} in ${time}ms`));
  }
}