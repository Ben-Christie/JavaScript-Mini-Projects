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
