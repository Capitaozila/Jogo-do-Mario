const personagem = document.querySelector(".personagem");
const pipe = document.querySelector(".pipe");
const gameOverMessage = document.querySelector("h1");
const scoreDisplay = document.querySelector(".score");

let score = 0;
let passouPelosCanos = false;

const jump = () => {
  personagem.classList.add("jump");

  setTimeout(() => {
    personagem.classList.remove("jump");
  }, 500);
};

function showGameOverMessage() {
  gameOverMessage.style.display = "block";
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(personagem)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 105) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    personagem.src = "../arquives/game-over.png";
    personagem.style.width = "70px";
    personagem.style.marginLeft = "55px";

    showGameOverMessage();

    clearInterval(loop);
  } else if (pipePosition <= -60 && !passouPeloCano) {
    // Se o personagem passou pelo cano com sucesso sem colidir e ainda não ganhou ponto neste salto
    score++;
    scoreDisplay.textContent = score;
    passouPeloCano = true; // Define a variável como verdadeira para evitar aumento múltiplo da pontuação
  } else if (pipePosition > -80) {
    // Reinicia a variável quando o cano não estiver mais visível
    passouPeloCano = false;
  }
}, 10);

document.addEventListener("keydown", jump);

// adicionando música ao jogo

const backgroundMusic = document.getElementById("background-music");

backgroundMusic.play();

const musicCredit = document.createElement("p");
document.body.appendChild(musicCredit);

backgroundMusic.volume = 0.1;

//movimento do chão

const body = document.body;
const gameBoard = document.querySelector(".game-board");
let backgroundX = 0; // Posição inicial do fundo

// Função para atualizar a posição do fundo
function updateBackgroundPosition() {
  body.style.backgroundPosition = `${backgroundX}px 0`;
}

// Função para mover o fundo junto com o jogo
function moveBackground() {
  // Ajuste o valor de backgroundX com base no movimento do jogo
  backgroundX -= 10; // Exemplo de movimento para a esquerda

  // Atualize a posição do fundo
  updateBackgroundPosition();

  // Chame esta função em um loop, por exemplo, com requestAnimationFrame
  requestAnimationFrame(moveBackground);
}

// Chame a função para iniciar o movimento do fundo
moveBackground();
