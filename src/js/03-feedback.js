const qs = (s) => document.querySelector(s);
const form = qs('.feedback-form');
const emailInput = qs('input[name="email"]');
const msgInput = qs('textarea[name="message"]');

const LOCALSTORAGE_KEY = "feedback-form-state";

