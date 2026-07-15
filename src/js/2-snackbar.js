// Імпортуємо бібліотеку iziToast та її стилі CSS
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Знаходимо форму в DOM-дереві
const form = document.querySelector('.form');

// Обробляємо надсилання форми
form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // Створюємо та запускаємо проміс
  createPromise(delay, state)
    .then(delayValue => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
      });
    })
    .catch(delayValue => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
      });
    });
  form.reset();
});

// Функція-генератор промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
