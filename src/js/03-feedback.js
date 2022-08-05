let throttle = require('lodash.throttle');
const query = selector => document.querySelector(selector);

const email = query('input[name="email"]');
const message = query('textarea[name="message"]');
const btn = query('button[type="submit"]');

const checkStorage = () => {
  if (localStorage.getItem('feedback-form-state') !== '') {
    email.value = localStorage.getItem('email');
    message.value = localStorage.getItem('message');
  }
};
checkStorage();

const validateEmail = email => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const submitForm = e => {
  e.preventDefault();
  const obj = {
    email: email.value,
    message: message.value,
  };
  if (validateEmail(email.value) === true) {
    localStorage.setItem('feedback-form-state', JSON.stringify(obj));
    console.log(obj);

    localStorage.clear();
    email.value = '';
    message.value = '';
  } else {
    alert('Please type in correct email address: example@go.com');
  }
};

email.addEventListener(
  'input',
  throttle(e => {
    e.value = localStorage.setItem('email', email.value);
  }, 500),
);
message.addEventListener(
  'input',
  throttle(e => {
    e.value = localStorage.setItem('message', message.value);
  }, 500),
);
btn.addEventListener('click', submitForm);