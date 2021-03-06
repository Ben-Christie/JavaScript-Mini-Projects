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
