import throttle from 'lodash.throttle';
import { save, load, clear } from './storage.js';

const qs = (s) => document.querySelector(s);
const form = qs('.feedback-form');
const submitBtn = qs('button[type="submit"]');
const email = qs('input[name="email"]');
const message = qs('textarea[name="message"]');

const LOCALSTORAGE_KEY = "feedback-form-state";

const loadInput = () => {
    const state = load(LOCALSTORAGE_KEY);
    if (state) {
        email.value = state.email || '';
        message.value = state.message || '';
    }
};
loadInput();

const validateEmail = email => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

const onInputData = event => {
    const state = {
        email: email.value,
        message: message.value,
    };
    event.vale = save(LOCALSTORAGE_KEY, state);
}

const submitInput = event => {
    event.preventDefault();
    const state = {
        email: email.value,
        message: message.value,
    };
    if (validateEmail(email.value) === true) {
        console.log(state);

        clear(LOCALSTORAGE_KEY);
        
        email.value = '';
        message.value = '';
    } else {
    alert('Please type in correct email address: example@gmail.com');
    }
}

form.addEventListener("input", throttle(onInputData, 500));
submitBtn.addEventListener("click", submitInput);