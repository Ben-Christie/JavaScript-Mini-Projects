//in the window we have a console which we can use to log data that we can see from our javascript in our browser, helpful for seeing how data is formatted, etc.
//console.log()

//setup project on github
/*
  1. create new repo on github
  2. copy https from the "quick setup" section - should look like a url
  3. open terminal from vs code (input following commands)
    a. git init (to initialise empty repo)
    b. git remote add origin (paste copied https)
    c. git add .
    d. git commit -m 'initial commit'
    e. git push origin master
*/

//push change to repo
/*
  1. open terminal again
  2. type commands
    a. git add .
    b. git commit -m 'commit message'
    c. git push origin master
*/

//hosting on github
/*
  1. From the repo on github go to settings
  2. Scroll down to Github Pages
  3. Switch source from none to master branch
  4. a https should be provided and the website is now live (takes around 10 mins to setup initally so if no load don't worry)
*/

// cloning and pushing to repo
/* 
  1. In the terminal type git clone https://the-url-from-github.com to clone a repo
  2. to push changes first go into the new directory that was created from the cloning: cd directoryName/
  3. ls to look at all our files
  4. git status tells us what files have not been commited
  5. git add fileName (index.html, etc.)
  6.do git status again
  7. git commit -m 'commit message'
  8. git push
*/

// check branches
// git branch

// create branch
// git branch branchName

// switch to branch
// git checkout branchName

// pull update
// git pull

// merge master into branch
// git merge master

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
