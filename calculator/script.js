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
