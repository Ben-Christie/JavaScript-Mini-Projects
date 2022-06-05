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

//quotes-react.netlify.app
// https://type.fit/api/quotes

//create constants for the objects we want to target on the page i.e. if you want to target a button create a constant for it here

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show new quote
function newQuote() {
  //Math.random - get random number between 0 and 1
  //Math.floor - return largest integer that is less than or equal to a given number

  loadSpinner();

  let index = Math.floor(Math.random() * apiQuotes.length);

  // Pick a random quote from API array
  const quote = apiQuotes[index];

  console.log(quote);

  // check quote length to determine the styling i.e. if long reduce text size by applying css (.long-quote)
  if (quote.text.length > 120) {
    //add css class to classList in order to reduce text size if too long
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  //use textContent to allow us to pass in a string to be shown in the element

  //check if author is known or not
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // set quote and hide loader
  quoteText.textContent = quote.text;
  removeSpinner();
}

// Get quotes from API using asynchronous fetch request in a try catch
// an async function can run at any time independently and it won't stop the browser from completing the loading of a page
async function getQuote() {
  loadSpinner();

  // in the event you encounter CORS issue create a proxy url first and then call the api

  /*
    const proxyUrl = 'https//cors-anywhere.herokuapp.com/';

    in the fetch function concat the 2 urls 
    const response = await fetch(proxyUrl + apiUrl);
  */

  const apiUrl = 'https://type.fit/api/quotes';

  try {
    // await means that this const will not be populated until some data fetched from our API
    // response variable holds the json from the API
    const response = await fetch(apiUrl);

    // turn response into a json object and pass into global variable
    apiQuotes = await response.json();

    // console.log("API Quotes: ", apiQuotes);

    newQuote();
  } catch (error) {
    //handle error
    console.log('Error, no quote', error);
  }
}

// if we wanted to use a local array which can be viewed in the quotes.js file we can simply write a function like this
// function newLocalQuote() {
//   let index = Math.floor(Math.random() * localQuotes.length);
//   const quote = localQuotes[index];
//   console.log(quote);
// }

//to tweet a quote
function tweetQuote() {
  // use a back-tick (btn under esc) instead of single quotes as we want to add information to the string as seen below
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  // open url, use _blank to open in new tab
  window.open(twitterUrl, '_blank');
}

//show loader
function loadSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//remove loader
function removeSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//add event listeners for button clicks
twitterButton.addEventListener('click', tweetQuote);

newQuoteButton.addEventListener('click', newQuote);

//on load
getQuote();
