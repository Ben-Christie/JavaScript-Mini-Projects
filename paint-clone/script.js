const RETURN_TO_BRUSH_TIMEOUT = 1500;
const activeToolEl = document.getElementById('active-tool');
const brushColorBtn = document.getElementById('brush-color');
const brushIcon = document.getElementById('brush');
const brushSize = document.getElementById('brush-size');
const brushSlider = document.getElementById('brush-slider');
const bucketColorBtn = document.getElementById('bucket-color');
const eraser = document.getElementById('eraser');
const clearCanvasBtn = document.getElementById('clear-canvas');
const saveStorageBtn = document.getElementById('save-storage');
const loadStorageBtn = document.getElementById('load-storage');
const clearStorageBtn = document.getElementById('clear-storage');
const downloadBtn = document.getElementById('download');
// destructuring
const { body } = document;

// Global Variables
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
const context = canvas.getContext('2d');

let currentSize = 10;
let bucketColor = '#FFFFFF';
let currentColor = '#A51DAB';
// due to how the eraser functions we want to check if we're using the eraser or the brush functions
let isEraser = false;
let isMouseDown = false;
let drawnArray = [];

// Formatting Brush Size
function displayBrushSize() {
  if (brushSlider.value < 10) {
    brushSize.textContent = `0${brushSlider.value}`;
  } else {
    brushSize.textContent = brushSlider.value;
  }
}

// Setting Brush Size
brushSlider.addEventListener('change', () => {
  currentSize = brushSlider.value;
  displayBrushSize();
});

// Setting Brush Color
brushColorBtn.addEventListener('change', () => {
  isEraser = false;
  currentColor = `#${brushColorBtn.value}`;
});

// Setting Background Color, use change event so only make a change when a change occurs
bucketColorBtn.addEventListener('change', () => {
  bucketColor = `#${bucketColorBtn.value}`;
  createCanvas();
  // redraw what we had
  restoreCanvas();
});

// Eraser
eraser.addEventListener('click', () => {
  isEraser = true;
  brushIcon.style.color = 'white';
  eraser.style.color = 'black';
  activeToolEl.textContent = 'Eraser';
  // make eraser same color as background
  currentColor = bucketColor;
  currentSize = 50;
  brushSlider.value = currentSize;
  displayBrushSize();
});

// Switch back to Brush
function switchToBrush() {
  isEraser = false;
  activeToolEl.textContent = 'Brush';
  brushIcon.style.color = 'black';
  eraser.style.color = 'white';
  currentColor = `#${brushColorBtn.value}`;
  currentSize = 10;
  brushSlider.value = currentSize;
  displayBrushSize();
}

// set brush timeout
function setBrushTimeout(ms) {
  setTimeout(switchToBrush, ms);
}

// Create Canvas
function createCanvas() {
  // get the height/width of window using innerHeight/Width and then subtract 50 in this case due to the navbar at the top of the page which is 50px high
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;
  context.fillStyle = bucketColor;
  // x and y starting point and width and height of canvas
  context.fillRect(0, 0, canvas.width, canvas.height);
  body.appendChild(canvas);
  // have brush selected when page is loaded
  switchToBrush();
}

// Clear Canvas
clearCanvasBtn.addEventListener('click', () => {
  createCanvas();
  drawnArray = [];
  // Active Tool
  activeToolEl.textContent = 'Canvas Cleared';
  setBrushTimeout(RETURN_TO_BRUSH_TIMEOUT);
});

// Draw what is stored in DrawnArray
function restoreCanvas() {
  // loop through drawn array
  for (let i = 1; i < drawnArray.length; i++) {
    context.beginPath();
    context.moveTo(drawnArray[i - 1].x, drawnArray[i - 1].y);
    context.lineWidth = drawnArray[i].size;
    context.lineCap = 'round';

    if (drawnArray[i].eraser) {
      context.strokeStyle = bucketColor;
    } else {
      context.strokeStyle = drawnArray[i].color;
    }
    // redraw
    context.lineTo(drawnArray[i].x, drawnArray[i].y);
    context.stroke();
  }
}

// Store Drawn Lines in DrawnArray
function storeDrawn(x, y, size, color, erase) {
  const line = {
    x,
    y,
    size,
    color,
    erase,
  };
  console.log(line);
  drawnArray.push(line);
}

// Get Mouse Position
function getMousePosition(event) {
  // getting the point on the canvas that we clicked
  const boundaries = canvas.getBoundingClientRect();
  // returning the x and y coordinates calculated by subtracting the left and top of the boundary from the x and y of the canvas
  return {
    x: event.clientX - boundaries.left,
    y: event.clientY - boundaries.top,
  };
}

// Mouse Down
canvas.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  const currentPosition = getMousePosition(event);
  console.log('mouse is clicked', currentPosition);
  // start at the current position defined above
  context.moveTo(currentPosition.x, currentPosition.y);
  // begin drawing path
  context.beginPath();
  // set line width
  context.lineWidth = currentSize;
  // set how the end of the line looks, this could be changed to square if we wanted to
  context.lineCap = 'round';
  // set the colour of the line
  context.strokeStyle = currentColor;
});

// Mouse Move
canvas.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const currentPosition = getMousePosition(event);
    console.log('mouse is moving', currentPosition);
    context.lineTo(currentPosition.x, currentPosition.y);
    context.stroke();
    // here we're storing the current position, brush size, colour and wether or not we're using an eraser
    storeDrawn(
      currentPosition.x,
      currentPosition.y,
      currentSize,
      currentColor,
      isEraser
    );
  } else {
    // otherwise we want to store an undefined value, stored when we're drawing or erasing something
    storeDrawn(undefined);
  }
});

// Mouse Up
canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
  console.log('mouse is unclicked');
});

// Save to Local Storage
saveStorageBtn.addEventListener('click', () => {
  localStorage.setItem('savedCanvas', JSON.stringify(drawnArray));

  // Active Tool
  activeToolEl.textContent = 'Canvas Saved';

  // set the period of time we wait to return to brush function
  setBrushTimeout(RETURN_TO_BRUSH_TIMEOUT);
});

// Load from Local Storage
loadStorageBtn.addEventListener('click', () => {
  // check if something in local storage
  if (localStorage.getItem('savedCanvas')) {
    drawnArray = JSON.parse(localStorage.savedCanvas);

    // redraw canvas
    restoreCanvas();

    // Active Tool
    activeToolEl.textContent = 'Canvas Loaded';
    setBrushTimeout(RETURN_TO_BRUSH_TIMEOUT);
  } else {
    activeToolEl.textContent = 'No Canvas Found';
    setBrushTimeout(RETURN_TO_BRUSH_TIMEOUT);
  }
});

// Clear Local Storage
clearStorageBtn.addEventListener('click', () => {
  // localStorage.clear() clears everything for every project so not a good idea
  localStorage.removeItem('savedCanvas');

  // Active Tool
  activeToolEl.textContent = 'Local Storage Cleared';
  setBrushTimeout(RETURN_TO_BRUSH_TIMEOUT);
});

// Download Image
downloadBtn.addEventListener('click', () => {
  // save canvas as jpg, the number is between 0 and 1 and denotes the quality of the jpg, we've set it to the highest quality
  downloadBtn.href = canvas.toDataURL('image/jpeg', 1.0);
  // name the download
  downloadBtn.download = 'painting.jpeg';

  // Active Tool
  activeToolEl.textContent = 'Image File Saved';
  setBrushTimeout(RETURN_TO_BRUSH_TIMEOUT);
});

// Event Listener
brushIcon.addEventListener('click', switchToBrush);

// On Load
createCanvas();
