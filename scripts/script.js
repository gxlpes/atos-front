// results
const resultsButton = document.querySelector(".results");

// modal setup
const modal = document.querySelector(".modal");
const secondModal = document.querySelector(".second-modal");
const buttonDismiss = document.querySelector(".dismiss");
const buttonSaveProgress = document.querySelector(".save-progress");
const buttonSaveData = document.querySelector(".save-data");
const backBg = document.querySelector(".bg-modal");

const elementNameM = document.querySelector(".modal-element-symbol");
const elementNumberM = document.querySelector(".modal-element-number");
const elementDescM = document.querySelector(".element-d");

const buttonStartGame = document.getElementById("start");
const colorName = document.querySelector(".color-name");
const colorBox = document.querySelectorAll(".color-box");
let points = document.querySelector(".points");
let round = document.querySelector(".round");

function arrayOfNumbers(start, end) {
  let myArray = [];
  for (let i = start; i <= end; i++) {
    myArray.push(i);
  }
  return myArray;
}

buttonStartGame.addEventListener("click", () => startGame());

const startGame = async () => {
  formatText();
  startCountdown(3);
};

const formatText = async () => {
  colorName.innerHTML = await randomName(1);
  colorName.style.color = await randomColor(1);
};

const startCountdown = (timer) => {
  let timeleft = timer;
  let downTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downTimer);
      document.getElementById("countdown").innerHTML = "0";
      document.querySelector(".error").style.display = "block";
      modal.style.display = "flex";
      backBg.style.display = "block";
    } else {
      document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);
};

const randomName = async () => {
  const response = await fetch("../data/names.json");
  const json = await response.json();
  const name = await json[getRandomNumber()];
  return await Promise.resolve(name);
};

const randomColor = async (func) => {
  const response = await fetch("../data/colors.json");
  const json = await response.json();
  if (func == 1) {
    const color = await json[getRandomNumber()];
    return await Promise.resolve(color);
  } else {
    const colorArr = await json[getRandomNumberNoRepeat()];
    console.log(colorArr);
    return await Promise.resolve(colorArr);
  }
};

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var getRandomNumberNoRepeat = function () {
  if (arr.length == 0) arr = arrayOfNumbers(1, 9);
  var index = Math.floor(arr.length * Math.random());
  var drawn = arr.splice(index, 1);
  return drawn[0];
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * (9 - 1 + 1) + 1);
};

const randomBoxes = () => {
  let boxes = document.querySelectorAll(".color-box");
  boxes.forEach(async (el) => {
    el.style.background = await randomColor(2);
  });
};

colorBox.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (e.target.style.background == colorName.style.color) startNewGame();
  });
});

const startNewGame = () => {
  formatText();
  points.innerHTML++;

  switch (round.innerHTML) {
    case "1":
      startCountdown(3);
      break;
    case "2":
      startCountdown(2);
      break;
    case "3":
      startCountdown(2);
      randomBoxes();
      break;
    case "4":
      startCountdown(1.7);
      randomBoxes();
      break;
    case "5":
      startCountdown(1.5);
      randomBoxes();
      break;
    case "6":
      startCountdown(1);
      randomBoxes();
      break;
  }

  if (points.innerHTML % 10 === 0) round.innerHTML++;
};

buttonDismiss.addEventListener("click", function () {
  modal.style.display = "none";
  backBg.style.display = "none";
});

buttonSaveProgress.addEventListener("click", function () {
  modal.style.display = "none";
  secondModal.style.display = "flex";
});

buttonSaveData.addEventListener("click", function () {
  objectToSave = {
    rounds: round.innerHTML,
    points: points.innerHTML,
    name: document.querySelector(".input-name").value,
  };

  let rsp = [];

  let res = JSON.parse(localStorage.getItem("session"));
  if (res == null) {
    rsp.push(objectToSave);
    console.log(rsp);
    localStorage.setItem("session", JSON.stringify(rsp));
  } else {
    res.push(objectToSave);
    localStorage.setItem("session", JSON.stringify(res));
  }

  secondModal.style.display = "none";
  backBg.style.display = "none";
});
