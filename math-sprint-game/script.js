// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
// populated with all equations both correct and incorrect
let equationsArray = [];
// right and wrong answers
let playerGuessArray = [];
// array for best score
let bestScoreArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
// stores the wrong formats which we can apply to the wrong equeations to make them wrong
const wrongFormat = [];

// Time
let timer; //interval that'll be started and stopped
let timePlayed = 0; //this will be updated by the intervalevery 10th of a second
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

// Scroll
let valueY = 0; //will go up 80px at a time so next equation is highlighted blue

// refresh splash page best scores
function bestScoresToDom() {
  bestScores.forEach((bestScore, index) => {
    const bestScoreEl = bestScore;
    bestScoreEl.textContent = `${bestScoreArray[index].bestScore}s`;
  });
}

// check local storage for best scores and then set best score array values
function getSavedBestScores() {
  // if there is something in local storage
  if (localStorage.getItem('bestScores')) {
    bestScoreArray = JSON.parse(localStorage.bestScores);
  } else {
    // if doesn't exist create
    bestScoreArray = [
      { questions: 10, bestScore: finalTimeDisplay },
      { questions: 25, bestScore: finalTimeDisplay },
      { questions: 50, bestScore: finalTimeDisplay },
      { questions: 99, bestScore: finalTimeDisplay },
    ];

    localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
  }
  bestScoresToDom();
}

// update best score array
function updateBestScore() {
  bestScoreArray.forEach((score, index) => {
    // select correct best score to update
    if (questionAmount == score.questions) {
      // return best score as a number with 1 decimal
      const savedBestScore = Number(bestScoreArray[index].bestScore);

      // update if new final score is less or replaceing 0
      if (savedBestScore === 0 || savedBestScore > finalTime) {
        bestScoreArray[index].bestScore = finalTimeDisplay;
      }
    }
  });
  // update splash page
  bestScoresToDom();
  // save to local storage
  localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
}

// reset the game
function playAgain() {
  // add back event listener
  gamePage.addEventListener('click', startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  playerGuessArray = [];
  valueY = 0;
  playAgainBtn.hidden = true;
}

// show score page
function showScorePage() {
  // show play again button after 1 second
  setTimeout(() => {
    playAgainBtn.hidden = false;
  }, 1000);

  gamePage.hidden = true;
  scorePage.hidden = false;
}

// format and display time in DOM
function scoresToDom() {
  // round to 1 decimal place
  finalTimeDisplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);

  // update html elements
  baseTimeEl.textContent = `Base Time: ${baseTime}s`;
  penaltyTimeEl.textContent = `Penalty Time: +${penaltyTime}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;

  updateBestScore();

  // scroll to top of item container and then go to score page, this says scroll to the top instantly
  itemContainer.scrollTo({ top: 0, behavior: 'instant' });

  showScorePage();
}

// check the players score
function checkScore() {
  equationsArray.forEach((equation, index) => {
    if (equation.evaluated != playerGuessArray[index]) {
      penaltyTime += 0.5;
    }
  });

  finalTime = timePlayed + penaltyTime;

  console.log('time', timePlayed, 'penalty', penaltyTime, 'final', finalTime);

  scoresToDom();
}

// stop timer, process results, go to score page
function checkTime() {
  console.log('time played', timePlayed);
  if (playerGuessArray.length == questionAmount) {
    console.log('player guess array:', playerGuessArray);
    clearInterval(timer);
    checkScore();
  }
}

// add a 10th of a second to time played
function addTime() {
  timePlayed += 0.1;
  checkTime();
}

// start timer when game page is clicked
function startTimer() {
  // reset times
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;

  // 0.1 seconds = 100 milliseconds
  timer = setInterval(addTime, 100);

  // to make sure its only started once
  gamePage.removeEventListener('click', startTimer);
}

// scroll and store user selection in playerGuessArray
function select(guessedTrue) {
  // scroll 80px at a time
  valueY += 80;
  // scroll the itemContainer 0px in the x-direction anf valueY in the y-direction
  itemContainer.scroll(0, valueY);

  // add player guess to the playerGuessArray
  return guessedTrue
    ? playerGuessArray.push('true')
    : playerGuessArray.push('false');
}

// display game page
function showGamePage() {
  gamePage.hidden = false;
  countdownPage.hidden = true;
}

// get random number up to a max number
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;

    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;

    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;

    const formatChoice = getRandomInt(3); // 0, 1, 2
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  // from shuffle.js file
  shuffle(equationsArray);
}

// add equations to DOM
function equationsToDom() {
  equationsArray.forEach((equation) => {
    // item
    const item = document.createElement('item');
    item.classList.add('item');

    // equation text
    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;

    // append
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDom();

  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

// run countdown, 3, 2, 1, G0!
function countdownStart() {
  let count = 3;
  countdown.textContent = count;

  // assign set interval to a variable so that we can clear it
  // setInterval runs the code every defined period of time in this case 1 second (1000 milliseconds)
  const timeCountDown = setInterval(() => {
    count--;

    if (count === 0) {
      countdown.textContent = 'Go!';
    } else if (count === -1) {
      showGamePage();
      clearInterval(timeCountDown);
    } else {
      countdown.textContent = count;
    }
    // 1 second = 1000 milliseconds
  }, 1000);
}

// navigate from splash page to countdown page
function showCountdown() {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  populateGamePage();
  countdownStart();
}

// get the value from the selected radio button
function getRadioValue() {
  let radioValue;

  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
      // pass in the value attribute
      radioValue = radioInput.value;
    }
  });
  return radioValue;
}

// form that decides amount of questions
function selectQuestionAmount(event) {
  // stop submit from attempting to submit to web server
  event.preventDefault();

  console.log('Event', event);

  questionAmount = getRadioValue();

  console.log('Question Amount', questionAmount);

  // if we have a question amount
  if (questionAmount) {
    showCountdown();
  }
}

// event listener
startForm.addEventListener('click', () => {
  radioContainers.forEach((radioEl) => {
    // remove selected label styling
    radioEl.classList.remove('selected-label');

    // add it back if the radio input is selected
    // target 2nd html child of radio container
    if (radioEl.children[1].checked) {
      radioEl.classList.add('selected-label');
    }
  });
});

startForm.addEventListener('submit', selectQuestionAmount);
gamePage.addEventListener('click', startTimer);

// On load
getSavedBestScores();
