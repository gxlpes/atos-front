const buttonStartGame = document.getElementById("start");
const nameColor = document.querySelector(".name-color");
const colorBox = document.querySelectorAll(".color-box");
let points = document.querySelector(".points");

buttonStartGame.addEventListener("click", () => startGame());

const startGame = async () => {
  startCountdown(3);
  formatText();
};

const formatText = async () => {
  nameColor.innerHTML = await randomName();
  nameColor.style.color = await randomColor();
};

const randomName = async () => {
  const response = await fetch("../data/names.json");
  const json = await response.json();
  const name = await json[randomNumber()];
  return await Promise.resolve(name);
};

const randomColor = async () => {
  const response = await fetch("../data/colors.json");
  const json = await response.json();
  const color = await json[randomNumber()];
  return await Promise.resolve(color);
};

const randomNumber = () => {
  return Math.floor(Math.random() * 9 + 1);
};

const startCountdown = (timer) => {
  let timeleft = timer;
  let downTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downTimer);
      document.getElementById("countdown").innerHTML = "0";
      document.querySelector(".error").style.display = "block";
    } else {
      document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);
};

const randomBoxes = () => {
  let boxes = document.querySelectorAll(".color-box");
  boxes.forEach(async (el) => {
    el.style.backgroundColor = await randomColor();
  });
};

colorBox.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (e.target.classList[1] == nameColor.style.color) {
      startNewGame();
    }
  });
});

const startNewGame = () => {
  startCountdown(3);
  formatText();
  points.innerHTML++;
};
