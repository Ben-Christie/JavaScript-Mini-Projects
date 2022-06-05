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

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disable/enable button
function toggleButton() {
  //this sets the state of the button to the opposite of what it already is, therefore, if it's disabled and we call teh function the button will be enabled and vice versa
  button.disabled = !button.disabled;
}

// passing a joke to our voice API
function tellMe(joke) {
  console.log('tell me: ', joke);

  VoiceRSS.speech({
    key: '067e7080b6c4489ba44663806c726fea',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// get jokes from joke API
async function getJokes() {
  let joke = '';

  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    // convert to json format
    const data = await response.json();

    // if theres a setup its a 2 part joke not a 1 part joke
    if (data.setup) {
      // concat setup and delivery, use back-tick (under esc key) not single quotes
      // ... used for pause in speech
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // text-to-speech
    tellMe(joke);

    // disable button
    toggleButton();

    console.log(data);
  } catch (error) {
    // handle error
    console.log('getJokes() error: ', error);
  }
}

// event listeners
button.addEventListener('click', getJokes);

// enable button when audio ended
audioElement.addEventListener('ended', toggleButton);
