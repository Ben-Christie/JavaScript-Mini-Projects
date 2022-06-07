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
