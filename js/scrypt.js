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
}, 10);

document.addEventListener("keydown", jump);
