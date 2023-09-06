const personagem = document.querySelector(".personagem");
const pipe = document.querySelector(".pipe");
const gameOverMessage = document.querySelector("h1");

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
  }
}, 10);

document.addEventListener("keydown", jump);

// adicionando música ao jogo

const backgroundMusic = document.getElementById("background-music");

backgroundMusic.play();

const musicCredit = document.createElement("p");
document.body.appendChild(musicCredit);

backgroundMusic.volume = 0.1;