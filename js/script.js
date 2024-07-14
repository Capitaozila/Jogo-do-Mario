const personagem = document.querySelector(".personagem");
const pipe = document.querySelector(".pipe");
const gameOverMessage = document.querySelector("h1");
const scoreDisplay = document.querySelector(".score");
const backgroundMusic = document.getElementById("background-music");

let score = 0;
let passedCano = false;
let isGameOver = false;
let isBackgroundMoving = true; // Flag para controlar o movimento do cenário

const jumpDuration = 500;
const collisionCheckInterval = 10;

const jump = () => {
  if (isGameOver) return;
  personagem.classList.add("jump");
  setTimeout(() => {
    personagem.classList.remove("jump");
  }, jumpDuration);
};

const showGameOverMessage = () => {
  gameOverMessage.style.display = "block";
};

const stopGame = () => {
  isGameOver = true;
  isBackgroundMoving = false; // Parar o movimento do cenário
  clearInterval(collisionCheckLoop);
  backgroundMusic.pause(); // Pausar a música de fundo, se estiver tocando
  // Outras ações de finalização do jogo, se necessário
};

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
    stopGame(); // Chama a função para parar o jogo
  } else if (pipePosition <= -60 && !passedCano) {
    score++;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    passedCano = true;
  } else if (pipePosition > -60) {
    passedCano = false;
  }
};

let collisionCheckLoop = setInterval(checkCollision, collisionCheckInterval);

document.addEventListener("keydown", (event) => {
  if ((event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") && !isGameOver) {
    jump();
  }
});

backgroundMusic.play();
backgroundMusic.volume = 0.1;

const body = document.body;
let backgroundX = 0;

const updateBackgroundPosition = () => {
  if (isBackgroundMoving) { // Verifica se o cenário ainda deve se mover
    body.style.backgroundPosition = `${backgroundX}px 0`;
  }
};

const moveBackground = () => {
  if (!isGameOver) {
    backgroundX -= 10;
    updateBackgroundPosition();
    requestAnimationFrame(moveBackground);
  }
};

moveBackground();
