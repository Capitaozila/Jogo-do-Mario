const personagem = document.querySelector(".personagem");
const pipe = document.querySelector(".pipe");

const jump = () => {
  personagem.classList.add("jump");

  setTimeout(() => {
    personagem.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(personagem).bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 105) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    personagem.src = "../img/game-over.png";
    personagem.style.width = "70px";
    personagem.style.marginLeft = "55px";

    clearInterval(loop);
  }
}, 10);

document.addEventListener("keydown", jump);
