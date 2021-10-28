// * MY CANVAS SETUPS

const canvas = document.querySelector("#my-canvas");
canvas.style.backgroundColor = "black";
canvas.width = 1000;
canvas.height = 500;

const ctx = canvas.getContext("2d");

// * GLOBAL VARIABLES

let isGameRunning = true;
let counterScore = 0;
let scoreSpan = document.querySelector("h2 span"); //to update Score

//Ball Variables
let ballX = 50;
let ballY = 50;
let ballRadius = 15;
let ballXDirection = 1; // set 1 when is going right and -1 when it's going left
let ballYDirection = 1; // set 1 when is going down and -1 when it's going up
let ballSpeed = 2;

//Paddle Variables
let paddleX = canvas.width / 3;
let paddleY = canvas.height - 30;
let paddleWidth = 180;
let paddleHeight = 20;

// * FUNCTIONS

const ballWallCollision = () => {
  //collision with right wall
  if (ballX > canvas.width - ballRadius) {
    ballXDirection = -1;
  }
  //collision with bottom wall
  if (ballY > canvas.height - ballRadius) {
    //ballYDirection = -1;
    isGameRunning = false;
  }
  //collision with left wall
  if (ballX < 0 + ballRadius) {
    ballXDirection = 1;
  }
  //collision with top wall
  if (ballY < 0 + ballRadius) {
    ballYDirection = 1;
  }
};

const ballMovement = () => {
  ballX = ballX + ballSpeed * ballXDirection;
  ballY = ballY + ballSpeed * ballYDirection;
};

const ballDraw = () => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

const paddleDraw = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fill();
};

const paddleMovement = (event) => {
  //let buttonClicked = event.code;
  //here I will need to check which even am I triggering
  //if it's the one I want -> move the paddle

  if (event.code === "ArrowRight") {
    paddleX = paddleX + 30;
  } else if (event.code === "ArrowLeft") {
    paddleX = paddleX - 30;
  }

  if(paddleX <= 0) {
    paddleX = 1;
  }

  if(paddleX + paddleWidth >= canvas.width) {
    paddleX = canvas.width - paddleWidth;
  }

};

const paddleBallCollision = () => {
  
  if (
    ballY + ballRadius > paddleY &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    ballYDirection = -1;
    counterScore = counterScore +1;
    ballSpeedIncrease();
    scoreUpdate();
  }
};

const ballSpeedIncrease = () => {

  if (counterScore !==0 && counterScore % 2 === 0 ) {
    ballSpeed = ballSpeed + 1;
  }

}

const scoreUpdate = () => {
  scoreSpan.innerText = counterScore;
}

const gameLoop = () => {
  //function loop written as arrow function - best practice
  /* console.log("yay, loop running!") */
  // 1. clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. elements moving or changing
  ballMovement();
  ballWallCollision();
  paddleBallCollision();

  // 3. draw elements

  ballDraw();
  paddleDraw();

  // 4. animation frame and logic
  if (isGameRunning) {
    requestAnimationFrame(gameLoop);
  };
};

// * ADD EventListeners
//EventListeners should always be added at the bottom of code, but before the function is invocated

window.addEventListener("keydown", paddleMovement);

gameLoop();

// ! BONUS
// Prevent Paddles from hitting the wall
// Increase speed of the ball after each paddle hit
// not on each hit, but every 5 hits
//SCORE increases on each paddle hit
