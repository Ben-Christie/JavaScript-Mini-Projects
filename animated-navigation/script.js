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

const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

const navItems = [nav1, nav2, nav3, nav4, nav5];

// control navigation animation
function navAnimation(removing, adding) {
  navItems.forEach((nav, index) => {
    index += 1;
    nav.classList.replace(
      `slide-${removing}-${index}`,
      `slide-${adding}-${index}`
    );
  });
}

function toggleNav() {
  // Toggle: menu bars open/closed
  // toggle allows us to add or remove the specified class, in this case the change class
  menuBars.classList.toggle('change');

  // Toggle: menu to be active/not
  // overlay-active doesn't do anything (no css), we're using as a boolean to determine if the overlay is active or not
  overlay.classList.toggle('overlay-active');

  if (overlay.classList.contains('overlay-active')) {
    // Animate In - Overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');

    // Animate in
    navAnimation('out', 'in');
  } else {
    // Animate Out - Overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');

    // Animate out
    navAnimation('in', 'out');
  }
}

// event listeners
menuBars.addEventListener('click', toggleNav);

navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});
