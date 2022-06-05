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

// destructuring
const { body } = document; // equivalent to const body = document.body

function changeBackground(number) {
  // check if background already showing
  let previousBackground;

  // if there is any css on our body
  if (body.className) {
    previousBackground = body.className;
  }

  // reset css classes on body
  body.className = '';

  switch (number) {
    case '1':
      // if previous background = 1 ? if true do nothing else add button 1 to classList
      return previousBackground === 'background-1'
        ? false
        : body.classList.add('background-1');

    case '2':
      return previousBackground === 'background-2'
        ? false
        : body.classList.add('background-2');

    case '3':
      return previousBackground === 'background-3'
        ? false
        : body.classList.add('background-3');

    default:
      break;
  }
}
