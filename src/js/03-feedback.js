import storageAPI from "./storage";

var throttle = require("lodash.throttle");

const form = document.querySelector('.feedback-form');
const KEY_FORM = 'feedback-form-state';
const messageAlert = "Всі поля мають бути заповнені!";
const throttleFormInput = throttle(handleInput, 500);

initPage();
form.addEventListener("input", throttleFormInput);
form.addEventListener('submit', handleSubmit);


function handleInput(evt) {   
    const { name, value } = evt.target;
    let savedData = storageAPI.load(KEY_FORM);
    savedData = savedData ? savedData : {};
    
    savedData[name] = value;
    storageAPI.save(KEY_FORM, savedData);
}

function initPage() {
    const savedData = storageAPI.load(KEY_FORM);
    console.log(savedData);
    if (!savedData) {
        return;
    }

    Object.entries(savedData).forEach(([name, value]) => {
        form.elements[name].value = value
    });
}

function handleSubmit(evt) {
    evt.preventDefault();
    const {
        elements: {email, message}
    } = evt.currentTarget;

    if (email.value === "" || message.value === "") {
        return alert(messageAlert);
    }
    console.log({ email: email.value, message: message.value });
    evt.currentTarget.reset();
    storageAPI.remove(KEY_FORM);
}