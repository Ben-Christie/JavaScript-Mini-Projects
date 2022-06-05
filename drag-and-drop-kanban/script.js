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

const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
// the actual item we are adding
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogListEl = document.getElementById('backlog-list');
const progressListEl = document.getElementById('progress-list');
const completeListEl = document.getElementById('complete-list');
const onHoldListEl = document.getElementById('on-hold-list');

// Items
// this will be set to true once we've updated from local storage
let updatedOnLoad = false;

// Initialise Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
// an array of all the local storage arrays
let listArrays = [];

// Drag Functionality
let draggedItem;
// we'll change this if we're dragging something
let dragging = false;
// will be set to the current column we're dragging over to identify where we want to drop
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Fix Bug'];
    progressListArray = ['Implement New Feature', 'Prepare Presentation'];
    completeListArray = ['New UI'];
    onHoldListArray = ['Update Database'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];

  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];

  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(
      `${arrayName}Items`,
      JSON.stringify(listArrays[index])
    );
  });
}

// Filter Array to remove empty values
function filterArray(array) {
  const filteredArray = array.filter((item) => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.id = index;
  listEl.classList.add('drag-item');

  // make the list element item draggable
  listEl.draggable = true;

  // on focus out triggers when an item loses focus i.e. we click on to another item or away from the item in question
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  listEl.setAttribute('ondragstart', 'drag(event)');

  listEl.contentEditable = true;

  // Append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  // Backlog Column
  // target ul element
  backlogListEl.textContent = '';

  backlogListArray.forEach((backlogItem, index) => {
    // element, column index, item, index
    createItemEl(backlogListEl, 0, backlogItem, index);
  });

  backlogListArray = filterArray(backlogListArray);

  // Progress Column
  progressListEl.textContent = '';

  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressListEl, 1, progressItem, index);
  });

  progressListArray = filterArray(progressListArray);

  // Complete Column
  completeListEl.textContent = '';

  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeListEl, 2, completeItem, index);
  });

  completeListArray = filterArray(completeListArray);

  // On Hold Column
  onHoldListEl.textContent = '';

  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldListEl, 3, onHoldItem, index);
  });

  onHoldListArray = filterArray(onHoldListArray);

  // Don't run more than once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns(); // Update local storage
}

// Update Item - Delete if necessary, or update Array value
function updateItem(itemId, columnIndex) {
  // the specified column e.g. backlog or progress columns
  const selectedArray = listArrays[columnIndex];

  // an array of the children html elements of the column at the specified index
  const selectedColumn = listColumns[columnIndex].children;

  // ensure item is not being dragged so that we can avoid error
  if (!dragging) {
    if (!selectedColumn[itemId].textContent) {
      delete selectedArray[itemId];
    } else {
      selectedArray[itemId] = selectedColumn[itemId].textContent;
    }
    updateDOM();
  }
}

// Add to Column List, Reset Textbox
function addToColumn(columnIndex) {
  const itemText = addItems[columnIndex].textContent;
  const selectedArray = listArrays[columnIndex];

  // push to array
  selectedArray.push(itemText);

  // reset textbox
  addItems[columnIndex].textContent = '';

  updateDOM(columnIndex);
}

// Show Add Item Input Box
function showInputBox(columnIndex) {
  addBtns[columnIndex].style.visibility = 'hidden';
  saveItemBtns[columnIndex].style.display = 'flex';
  addItemContainers[columnIndex].style.display = 'flex';
}

// Hide Item Input Box
function hideInputBox(columnIndex) {
  addBtns[columnIndex].style.visibility = 'visible';
  saveItemBtns[columnIndex].style.display = 'none';
  addItemContainers[columnIndex].style.display = 'none';

  // add text to column
  addToColumn(columnIndex);
}

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  // show the children of the backlogList html element
  console.log(backlogListEl.children);

  // backlogListEl.children is not an array but a HTMLCollection, thus we must convert it to an array using Array.from()
  backlogListArray = Array.from(backlogListEl.children).map(
    (item) => item.textContent
  );

  // we can use a map instead of doing all of this
  // backlogListArray = [];
  // for (let i = 0; i < backlogListEl.children.length; i++) {
  //   // push children to the array
  //   backlogListArray.push(backlogListEl.children[i].textContent);
  // }

  progressListArray = Array.from(progressListEl.children).map(
    (item) => item.textContent
  );

  completeListArray = Array.from(completeListEl.children).map(
    (item) => item.textContent
  );

  onHoldListArray = Array.from(onHoldListEl.children).map(
    (item) => item.textContent
  );

  updateDOM();
}

// When Item Enters Column Area
function dragEnter(columnIndex) {
  listColumns[columnIndex].classList.add('over');
  currentColumn = columnIndex;
}

// When Item Starts Dragging
function drag(event) {
  draggedItem = event.target;

  // set dragging to true so we know when we're dragging
  dragging = true;
}

// Column Allows for Item to Drop
function allowDrop(event) {
  event.preventDefault();
}

// Dropping Item in Column
function drop(event) {
  event.preventDefault();
  const parent = listColumns[currentColumn];

  // Remove Background Color/Padding
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });

  // Add item to Column
  parent.appendChild(draggedItem);

  // Dragging complete, reset value to false
  dragging = false;

  rebuildArrays();
}

// On Load
updateDOM();
