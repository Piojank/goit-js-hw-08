import throttle from 'lodash.throttle';
import { save, load, clear } from './storage.js';

const qs = (s) => document.querySelector(s);
const email = qs('input[name="email"]');
const message = qs('textarea[name="message"]');
const submitBtn = qs('button[type="submit"]');

const LOCALSTORAGE_KEY = "feedback-form-state";

const loadInput = () => {
    const state = load(LOCALSTORAGE_KEY);
    if (state !== "") {
        email.value = load("email");
        message.value = load("message");
    }
};
loadInput();

const validateEmail = email => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

const saveInput = (event) => {
    event.preventDefault();
    const state = {
        email: email.value,
        message: message.value,
    };
    if (validateEmail(email.value) === true) {
        save(LOCALSTORAGE_KEY, state);
        console.log(state);

        clear();
        email.value = '';
        message.value = '';
    } else {
    alert('Please type in correct email address: example@gmail.com');
    }
};

email.addEventListener("input", throttle(event => {
        event.value = save("email", email.value);
    }, 500),
);

message.addEventListener("input", throttle(event => {
        event.value = save("message", message.value);
    }, 500),
);

submitBtn.addEventListener("click", saveInput);