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

const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// async allows us to run a function without freezing/stopping the website 

// prompt the user to select a media stream, pass to video element, play video
async function selectMediaStream() {
  try {
    
    // screen capture API

    // get media stream
    // await waits until user has selected the screen they want to display
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();

    // pass media stream to video html element
    videoElement.srcObject = mediaStream;

    // when video has loaded its metadata it'll call a function to play
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }

  } catch (error) {
    // handle error
    console.log('selectMediaStream() Error: ', error);
  }
}

button.addEventListener('click', async () => {
  // disable button when clicked
  button.disabled = true;

  // start picture in picture (await for video element to make request for pictur sin picture)
  await videoElement.requestPictureInPicture();

  // reset button (only going to happen when picture in picture is successful)
  button.disabled = false;
});

// on load
selectMediaStream();