const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#f7f7f7";
const paddle1Color = "#43cea2";
const paddle2Color = "#e53935";
const paddleBorder = "#185a9d";
const ballColor = "#ffd600";
const ballBorderColor = "#185a9d";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let gameOver = false;
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: gameHeight / 2 - 50,
};
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight / 2 - 50,
};

window.addEventListener("keydown", function (event) {
  // Prevent default browser behavior for arrow keys and WASD
  const keysToPrevent = ["ArrowUp", "ArrowDown", "w", "s", "W", "S"];
  if (keysToPrevent.includes(event.key)) {
    event.preventDefault();
  }
  changeDirection(event);
});
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  gameOver = false;
  createBall();
  nextTick();
}
function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawCenterLine();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function drawCenterLine() {
  ctx.strokeStyle = "#90caf9";
  ctx.setLineDash([10, 15]);
  ctx.beginPath();
  ctx.moveTo(gameWidth / 2, 0);
  ctx.lineTo(gameWidth / 2, gameHeight);
  ctx.stroke();
  ctx.setLineDash([]);
}
function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function createBall() {
  ballSpeed = 2;
  ballXDirection = Math.random() < 0.5 ? 1 : -1;
  ballYDirection = Math.random() * 2 - 1;
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}
function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}
function drawBall(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}
function checkCollision() {
  if (gameOver) return;

  // Top and bottom wall collision
  if (ballY <= 0 + ballRadius || ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  // Left wall (player 2 scores)
  if (ballX <= 0) {
    player2Score += 1;
    updateScore();
    if (player2Score === 5) {
      showWinner("Player 2");
      return;
    }
    createBall();
    return;
  }
  // Right wall (player 1 scores)
  if (ballX >= gameWidth) {
    player1Score += 1;
    updateScore();
    if (player1Score === 5) {
      showWinner("Player 1");
      return;
    }
    createBall();
    return;
  }
  // Paddle 1 collision
  if (
    ballX <= paddle1.x + paddle1.width + ballRadius &&
    ballY > paddle1.y &&
    ballY < paddle1.y + paddle1.height
  ) {
    ballX = paddle1.x + paddle1.width + ballRadius;
    ballXDirection *= -1;
    ballSpeed += 0.5;
    ballYDirection += (Math.random() - 0.5) * 0.5;
  }
  // Paddle 2 collision
  if (
    ballX >= paddle2.x - ballRadius &&
    ballY > paddle2.y &&
    ballY < paddle2.y + paddle2.height
  ) {
    ballX = paddle2.x - ballRadius;
    ballXDirection *= -1;
    ballSpeed += 0.5;
    ballYDirection += (Math.random() - 0.5) * 0.5;
  }
}
function changeDirection(event) {
  // Use event.key instead of deprecated event.keyCode
  const key = event.key;
  if (key === "w" || key === "W") {
    if (paddle1.y > 0) {
      paddle1.y -= paddleSpeed;
    }
  } else if (key === "s" || key === "S") {
    if (paddle1.y < gameHeight - paddle1.height) {
      paddle1.y += paddleSpeed;
    }
  } else if (key === "ArrowUp") {
    if (paddle2.y > 0) {
      paddle2.y -= paddleSpeed;
    }
  } else if (key === "ArrowDown") {
    if (paddle2.y < gameHeight - paddle2.height) {
      paddle2.y += paddleSpeed;
    }
  }
}
function updateScore() {
  scoreText.textContent = `${player1Score} : ${player2Score}`;
}
function showWinner(winner) {
  gameOver = true;
  ctx.font = "48px Permanent Marker, cursive";
  ctx.fillStyle = "#e53935";
  ctx.textAlign = "center";
  ctx.fillText(`${winner} Wins!`, gameWidth / 2, gameHeight / 2);
  setTimeout(resetGame, 2000);
}
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: gameHeight / 2 - 50,
  };
  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight / 2 - 50,
  };
  ballSpeed = 2;
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
}
