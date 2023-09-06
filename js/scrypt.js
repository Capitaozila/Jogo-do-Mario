const personagem = document.querySelector(".personagem");
const pipe = document.querySelector(".pipe");
const gameOverMessage = document.querySelector("h1");
const scoreDisplay = document.querySelector(".score");

let score = 0;
let passedCano = false;

const jump = () => {
  personagem.classList.add("jump");
  setTimeout(() => {
    personagem.classList.remove("jump");
  }, 500);
};

function showGameOverMessage() {
  gameOverMessage.style.display = "block";
}

const checkCollision = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(personagem).bottom.replace("px", "");
  
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 105) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;
    personagem.src = "../arquives/game-over.png";
    personagem.style.width = "70px";
    personagem.style.marginLeft = "55px";
    showGameOverMessage();
    clearInterval(loop);
  } else if (pipePosition <= -60 && !passedCano) {
    score++;
    scoreDisplay.textContent = score;
    passedCano = true;
  } else if (pipePosition > -60) {
    passedCano = false;
  }
};

const loop = setInterval(checkCollision, 10);
document.addEventListener("keydown", jump);

const backgroundMusic = document.getElementById("background-music");
backgroundMusic.play();
backgroundMusic.volume = 0.1;

const body = document.body;
const gameBoard = document.querySelector(".game-board");
let backgroundX = 0;

function updateBackgroundPosition() {
  body.style.backgroundPosition = `${backgroundX}px 0`;
}

function moveBackground() {
  backgroundX -= 10;
  updateBackgroundPosition();
  requestAnimationFrame(moveBackground);
}

moveBackground();
