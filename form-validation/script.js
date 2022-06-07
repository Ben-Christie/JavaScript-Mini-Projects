const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;

let passwordsMatch = false;

function validateForm() {
  // using constraint API
  isValid = form.checkValidity();

  // style main message for an error
  if (!isValid) {
    message.textContent = 'Please fill out all required fields';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    // improve efficiency by not going through the rest of the code using a return
    return;
  }

  // check if passwords match
  if (password1El.value == password2El.value) {
    passwordsMatch = true;
    password1El.style.borderColor = 'green';
    password2El.style.borderColor = 'green';
  } else {
    passwordsMatch = false;
    message.textContent = 'Make sure passwords match';
    messageContainer.style.borderColor = 'red';
    message.style.color = 'red';
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
    return;
  }

  // if form is valid and passwords match display success message
  if (isValid && passwordsMatch) {
    message.textContent = 'Registration Successfull!';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
  }
}

// store form data
function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };

  // do something with user data
  console.log(user);
}

function processFormData(event) {
  event.preventDefault();

  // validate form data
  validateForm();

  // submit if valid
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

// event listener
form.addEventListener('submit', processFormData);
