const pong = document.getElementById("pong");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const ball = document.getElementById("ball");

// Set initial positions of paddles and ball
let player1Y = pong.offsetHeight / 2 - player1.offsetHeight / 2;
let player2Y = pong.offsetHeight / 2 - player2.offsetHeight / 2;
let ballX = pong.offsetWidth / 2 - ball.offsetWidth / 2;
let ballY = pong.offsetHeight / 2 - ball.offsetHeight / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;

// Update the positions of paddles and ball
function update() {
  player1.style.top = player1Y + "px";
  player2.style.top = player2Y + "px";
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

// Move the player 1 paddle
function movePlayer1Paddle(e) {
  const key = e.keyCode;
  const paddleSpeed = 10;

  if (key === 87 && player1Y > 0) {
    player1Y -= paddleSpeed;
  } else if (key === 83 && player1Y < pong.offsetHeight - player1.offsetHeight) {
    player1Y += paddleSpeed;
  }
}

// Move the player 2 paddle
function movePlayer2Paddle(e) {
  const key = e.keyCode;
  const paddleSpeed = 10;

  if (key === 38 && player2Y > 0) {
    player2Y -= paddleSpeed;
  } else if (key === 40 && player2Y < pong.offsetHeight - player2.offsetHeight) {
    player2Y += paddleSpeed;
  }
}

// Update the ball position and handle collision
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Collision with top/bottom walls
  if (ballY < 0 || ballY > pong.offsetHeight - ball.offsetHeight) {
    ballSpeedY *= -1;
  }

  // Collision with paddles
  if (
    ballX <= player1.offsetWidth &&
    ballY + ball.offsetHeight >= player1Y &&
    ballY <= player1Y + player1.offsetHeight
  ) {
    ballSpeedX *= -1;
  }

  if (
    ballX + ball.offsetWidth >= pong.offsetWidth - player2.offsetWidth &&
    ballY + ball.offsetHeight >= player2Y &&
    ballY <= player2Y + player2.offsetHeight
  ) {
    ballSpeedX *= -1;
  }
}

// Update the game state and perform game logic
function gameLoop() {
  moveBall();
  update();
  requestAnimationFrame(gameLoop);
}

// Listen for keydown events
document.addEventListener("keydown", movePlayer1Paddle);
document.addEventListener("keydown", movePlayer2Paddle);

// Start the game loop
gameLoop();