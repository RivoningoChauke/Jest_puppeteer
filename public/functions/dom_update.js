export const updateErrors = (errors, errorUl) => {
    for (let i = 0; i < errors.length; i++) {
        const errorListElement = document.createElement('li');
        errorListElement.textContent = errors[i]
        errorUl.appendChild(errorListElement)
    }
}

export const validateInput = (entries) => {
    let firstname = entries.first_name;
    let lastname = entries.last_name
    let age = entries.age;
    let errors = []
    if (!firstname) {
        errors.push("First Name is required")
    }
    if (!lastname) {
        errors.push("Last Name is required")
    }
    if (!age) {
        errors.push("Age is required")
    }
    return errors;
}

export const updateUsersOnDom = (users, usersUl) => {
    if (users.length <= 0) {
        usersUl.textContent = ""
        const noUsersPTag = document.createElement("P");
        noUsersPTag.id = "nouser";
        noUsersPTag.className = "card"
        usersUl.appendChild(noUsersPTag)
    }
    for (let i = 0; i < users.length; i++) {
        const userList = document.createElement("LI");
        userList.className = "card";
        const namesElement = document.createElement("p")
        namesElement.className = "names"
        const ageElement = document.createElement("P")
        ageElement.className = "ageitem"
        const { first_name, last_name, age } = users[i]
        namesElement.textContent = `${first_name} ${last_name}`
        ageElement.textContent = `${age}`
        userList.appendChild(namesElement)
        userList.appendChild(ageElement);
        usersUl.appendChild(userList);
    }
}

export const clearInputs = (inputs) => {
    Object.values(inputs).forEach(input => input.value = "")
}

export const numberKeyDownHandler = (evt) => {
    // Prevent symbols and letters from entering input on type
    return evt.key.match(/[a-z\+\-]/gi) && !evt.key.match(/arrow|back/gi) && evt.preventDefault()
}