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

// use querySelector to target a class or html element, use [] to look for a specific attribute
const toggleSwitch = document.querySelector('input[type="checkbox"]');

// make a const for each element we still need to change
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// document.documentElement returns the element that is the root element of the document (for example, the <html> element for HTML documents)
const highestElement = document.documentElement;

// dark or light images
function imageMode(color) {
  // change image source to theme required
  // use template string with ` (back-tick)
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

//toggle dark or light mode based on whether its dark or not
function toggleTheme(isDark) {
  // same as using rgba, just different syntax
  // use ternary operator, if isDark is true use first value else use the second
  nav.style.backgroundColor = isDark
    ? 'rgb(0 0 0 / 50%)'
    : 'rgb(255 255 255 / 50%)';
  textBox.style.backgroundColor = isDark
    ? 'rgb(255 255 255 / 50%)'
    : 'rgb(0 0 0 / 50%)';

  // to access multiple elements within the toggleIcon element we use the children function which adds all the elements inside the parent into an array which can be accessed as normal i.e. to access the first element = toggleIcon.children[0]
  console.log(toggleIcon.children);

  //change text to dark mode
  toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
  // replace sun icon class with moon or vice versa
  isDark
    ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
    : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');

  // change image source to dark theme
  isDark ? imageMode('dark') : imageMode('light');
}

// Switch theme dynamically
function switchTheme(event) {
  //see all the details about the event that has occurred
  console.log(event);
  // specify a particular part of the event in this case the checked attribute which is under the target section
  console.log('checked = ', event.target.checked);

  if (event.target.checked) {
    highestElement.setAttribute('data-theme', 'dark');

    // add to local storage, local storage allows us to save information between sessions so we can remember what our users like
    localStorage.setItem('theme', 'dark');

    // the darkMode() function is used to change the remaining elements tht weren't changed by the line above
    toggleTheme(true);
  } else {
    highestElement.setAttribute('data-theme', 'light');

    // add to local storage, local storage allows us to save information between sessions so we can remember what our users like
    localStorage.setItem('theme', 'light');

    // the lightMode() function is used to change the remaining elements tht weren't changed by the line above
    toggleTheme(false);
  }
}

// check if slider/checkbox has been changed
toggleSwitch.addEventListener('change', switchTheme);

// using local storage to set theme when initially visiting site

// check local storage for theme
const currentTheme = localStorage.getItem('theme');
console.log('Current Theme:', currentTheme);

// check if exist before trying to retrieve it
if (currentTheme) {
  highestElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    toggleTheme(true);
  }
}
