import {
    updateErrors,
    validateInput,
    updateUsersOnDom,
    clearInputs,
    numberKeyDownHandler
} from './functions/dom_update.js'
const form = document.querySelector("form");

const firstNameInput = document.querySelector("form #first_name")
const lastNameInput = document.querySelector("form #last_name");
const ageInput = document.querySelector("form #age");
const userUl = document.querySelector('.userlist ul');
const errorUl = document.querySelector('.error')
const users = []

form.addEventListener('submit', handleSubmit);
ageInput.addEventListener("keydown", numberKeyDownHandler)

function handleSubmit(e) {
    e.preventDefault();
    errorUl.textContent = ""
    const first_name = firstNameInput.value;
    const last_name = lastNameInput.value;
    const age = ageInput.value
    const errors = validateInput({
        first_name,
        last_name,
        age
    })

    if (errors.length > 0) {
        return updateErrors(errors, errorUl)
    }
    userUl.textContent = ""
    users.push({
        first_name,
        last_name,
        age
    })
    updateUsersOnDom(users, userUl)
    clearInputs({
        firstNameInput,
        lastNameInput,
        ageInput
    })
}
