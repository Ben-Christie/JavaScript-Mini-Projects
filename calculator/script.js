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

const calculatorDisplay = document.querySelector('h1');
// all buttons
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '=': (firstNumber, secondNumber) => firstNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // if current value is 0, replace it, if not concat number
    const displayValue = calculatorDisplay.textContent;

    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

// add decimal
function addDecimal() {
  // if operator pressed, don't add decimal
  if (awaitingNextValue) {
    return; // dont run rest of function
  }

  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// use operator
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);

  // prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return; // don't run rest of function
  }

  // assign first value if no value (= 0)
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  // ready for next value, store operator
  awaitingNextValue = true;

  operatorValue = operator;
}

// reset display
function resetAll() {
  calculatorDisplay.textContent = '0';
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
}

// add event listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
  // if inputBtn has no classes i.e. our number buttons
  if (inputBtn.classList.length === 0) {
    // we need an arrow function to call our sendNumberValue function so that it's not called automatically
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// event listener
clearBtn.addEventListener('click', resetAll);
