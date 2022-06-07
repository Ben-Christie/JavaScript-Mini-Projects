// Canvas
const { body } = document;

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// set width and height of canvas
const width = 500;
const height = 700;

const screenWidth = window.screen.width;
const canvasPosition = screenWidth / 2 - width / 2;
const isMobile = window.matchMedia('(max-width: 600px)');
const gameOverEl = document.createElement('div');

// Paddle
const paddleHeight = 10;
const paddleWidth = 50;
const paddleDiff = 25;
let paddleBottomX = 225; //center, canvas is 500px, center would be 150px but we need to offset as paddle is 50px wide
let paddleTopX = 225;
let playerMoved = false;
let paddleContact = false;

// Ball
let ballX = 250;
let ballY = 350;
const ballRadius = 5;

// Speed
let speedY;
let speedX;
let trajectoryX;
let computerSpeed;

// Change Mobile Settings
if (isMobile.matches) {
  speedY = -2;
  speedX = speedY;
  computerSpeed = 4;
} else {
  speedY = -1;
  speedX = speedY;
  computerSpeed = 3;
}

// Score
let playerScore = 0;
let computerScore = 0;
const winningScore = 7;

let isGameOver = true;
let isNewGame = true;

// Render Everything on Canvas
function renderCanvas() {
  // Canvas Background
  context.fillStyle = 'black'; // use black color
  // x = 0 y = 0 (this denotes top left corner of page but styling pushes to center of page), width and height set by our const
  context.fillRect(0, 0, width, height);

  // Paddle Color
  context.fillStyle = 'white';

  // Player Paddle (Bottom)
  // x value is the value that will change as we'll be able to scroll left and right
  context.fillRect(paddleBottomX, height - 20, paddleWidth, paddleHeight);

  // Computer Paddle (Top)
  context.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);

  // Dashed Center Line
  context.beginPath();
  context.setLineDash([4]); //make dashed line, 4px per dash
  context.moveTo(0, 350); // 0 x val = left and y val of 350 as center of 700px tall canvas
  context.lineTo(500, 350); // draw line across the page (page is 500 wide) keep 350 y val as we want a straight line
  context.strokeStyle = 'grey';
  context.stroke();

  // Ball
  context.beginPath();
  // ballX/Y pos will change, size of ball, 2 * pi used to draw full circle, pi on it's own draws semi-circle , draw counterclockwise set to false
  context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();

  // Score
  context.font = '32px Courier New';
  // fillText(text, x, y)
  context.fillText(playerScore, 20, canvas.height / 2 + 50);
  context.fillText(computerScore, 20, canvas.height / 2 - 30);
}

// Create Canvas Element
function createCanvas() {
  // set canvas width and height
  canvas.width = width;
  canvas.height = height;
  // append canvas to body
  body.appendChild(canvas);

  renderCanvas();
}

// Reset Ball to Center
function ballReset() {
  ballX = width / 2;
  ballY = height / 2;
  speedY = -3; // sends the ball down the screen
  paddleContact = false;
}

// Adjust Ball Movement
function ballMove() {
  // Vertical Speed
  ballY += -speedY;
  // Horizontal Speed
  if (playerMoved && paddleContact) {
    ballX += speedX;
  }
}

// Determine What Ball Bounces Off, Score Points, Reset Ball
function ballBoundaries() {
  // Bounce off Left Wall
  if (ballX < 0 && speedX < 0) {
    speedX = -speedX;
  }
  // Bounce off Right Wall
  if (ballX > width && speedX > 0) {
    speedX = -speedX;
  }

  // Bounce off player paddle (bottom)
  if (ballY > height - paddleDiff) {
    if (ballX > paddleBottomX && ballX < paddleBottomX + paddleWidth) {
      paddleContact = true; // contact has been made with the paddle

      // Add Speed on Hit
      if (playerMoved) {
        speedY -= 1;

        // Max Speed
        if (speedY < -5) {
          speedY = -5;
          computerSpeed = 6;
        }
      }
      speedY = -speedY;
      trajectoryX = ballX - (paddleBottomX + paddleDiff);
      speedX = trajectoryX * 0.3;
    } else if (ballY > height) {
      // Reset Ball, add to Computer Score
      ballReset();
      computerScore++;
    }
  }
  // Bounce off computer paddle (top)
  if (ballY < paddleDiff) {
    if (ballX > paddleTopX && ballX < paddleTopX + paddleWidth) {
      // Add Speed on Hit
      if (playerMoved) {
        speedY += 1;
        // Max Speed
        if (speedY > 5) {
          speedY = 5;
        }
      }
      speedY = -speedY;
    } else if (ballY < 0) {
      // Reset Ball, add to Player Score
      ballReset();
      playerScore++;
    }
  }
}

// Computer Movement
function computerAI() {
  // if the player has moved
  if (playerMoved) {
    // moves the paddle to the ball but uses the paddleDiff to slow down which allows the user to beat the AI
    if (paddleTopX + paddleDiff < ballX) {
      paddleTopX += computerSpeed;
    } else {
      paddleTopX -= computerSpeed;
    }
  }
}

function showGameOverEl(winner) {
  //Hide Canvas
  canvas.hidden = true;

  // Container
  gameOverEl.textContent = '';
  gameOverEl.classList.add('game-over-container');

  // Title
  const title = document.createElement('h1');
  title.textContent = `${winner} Wins!`;

  // Button
  const playAgainBtn = document.createElement('button');
  playAgainBtn.setAttribute('onclick', 'startGame()');
  playAgainBtn.textContent = 'Play Again';

  // Append
  gameOverEl.append(title, playAgainBtn);
  body.appendChild(gameOverEl);
}

// Check If One Player Has Winning Score, If They Do, End Game
function gameOver() {
  // if one player reaches the winning score (player or computer)
  if (playerScore === winningScore || computerScore === winningScore) {
    isGameOver = true;
    // Set Winner
    const winner = playerScore === winningScore ? 'Player' : 'Computer';
    showGameOverEl(winner);
  }
}

// Called Every Frame
function animate() {
  // update player score, ball movement, and pladdle movement
  renderCanvas();
  ballMove(); // control the speed that the bal lis travelling at, will speed up over time to a max, just changing x and y values to increase or decrease depending on the direction the bal is travelling

  ballBoundaries(); // when ball makes contact with the walls or a paddle it will bounce off and change directions, tracks if ball went passed bottom or top, this would mean the score needs to be changed

  computerAI();

  // call game over to keep checking if someone has won
  gameOver();

  // if game over is false
  if (!isGameOver) {
    // request the browser to keep calling over and over again before repainting the display
    window.requestAnimationFrame(animate);
  }
}

// Start Game, Reset Everything
function startGame() {
  // only when we restart the game wit the play again button, remove game over and show canvas
  if (isGameOver && !isNewGame) {
    body.removeChild(gameOverEl);
    canvas.hidden = false;
  }

  isGameOver = false;
  isNewGame = false;
  playerScore = 0;
  computerScore = 0;

  ballReset(); // reset ball to center and reset speed
  createCanvas();
  animate();

  canvas.addEventListener('mousemove', (event) => {
    console.log(event.clientX);
    // this is set to true when player moves and allows for the computer to react
    playerMoved = true;
    // Compensate for canvas being centered
    // paddleBottomX = clientX position -  screenWidth / 2 - width / 2 - 25
    paddleBottomX = event.clientX - canvasPosition - paddleDiff;

    // if reach the left edge
    if (paddleBottomX < paddleDiff) {
      paddleBottomX = 0;
    }

    // if reach the right edge
    if (paddleBottomX > width - paddleWidth) {
      paddleBottomX = width - paddleWidth;
    }

    // Hide Cursor
    canvas.style.cursor = 'none';
  });
}

// On Load
startGame();
