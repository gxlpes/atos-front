// results
const resultsButton = document.querySelector(".results");
const nameUser = document.querySelector(".input-name");

// modal setup
const modal = document.querySelector(".modal");
const secondModal = document.querySelector(".second-modal");
const buttonDismiss = document.querySelector(".dismiss");
const buttonSaveProgress = document.querySelector(".save-progress");
const buttonSaveData = document.querySelector(".save-data");
const backBg = document.querySelector(".bg-modal");

// game setup
const buttonStartGame = document.getElementById("start");
const colorName = document.querySelector(".color-name");
const colorBox = document.querySelectorAll(".color-box");
let points = document.querySelector(".points");
let round = document.querySelector(".round");

let gameStarted = false;

function arrayOfNumbers(start, end) {
  let myArray = [];
  for (let i = start; i <= end; i++) {
    myArray.push(i);
  }
  return myArray;
}

buttonStartGame.addEventListener("click", () => startNewGame());

const formatText = async () => {
  colorName.innerHTML = await randomName(1);
  colorName.style.color = await randomColor(1);
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
    if (gameStarted) {
      if (e.target.style.background == colorName.style.color) {
        points.innerHTML++;
        startNewGame();
      } else {
        finishGame();
      }
    }
  });
});

const finishGame = () => {
  modal.style.display = "flex";
  backBg.style.display = "block";
  document.querySelector(".rounds-played").innerHTML = round.innerHTML + " rounds";
  document.querySelector(".points-played").innerHTML = points.innerHTML + " pontos";

  points.innerHTML = 0;
  clearInterval(counter);
};

const startNewGame = () => {
  gameStarted = true;
  formatText();

  switch (round.innerHTML) {
    case "1":
      initial = 3000;
      count = initial;
      startCounter();
      break;
    case "2":
      initial = 3000;
      count = initial;
      startCounter();
      break;
    case "3":
      initial = 3000;
      count = initial;
      startCounter();
      randomBoxes();
      break;
    case "4":
      initial = 1700;
      count = initial;
      startCounter();
      randomBoxes();
      break;
    case "5":
      initial = 1500;
      count = initial;
      startCounter();
      randomBoxes();
      break;
    case "6":
      initial = 1000;
      count = initial;
      startCounter(1);
      randomBoxes();
      break;
  }

  if (points.innerHTML % 10 === 0 && points.innerHTML != 0) round.innerHTML++;
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
  if (nameUser.value.length > 0) {
    objectToSave = {
      rounds: round.innerHTML,
      points: points.innerHTML,
      name: nameUser.value,
    };

    // localStorage setup
    let rsp = [];
    let res = JSON.parse(localStorage.getItem("session"));
    if (res == null) {
      rsp.push(objectToSave);
      localStorage.setItem("session", JSON.stringify(rsp));
    } else {
      res.push(objectToSave);
      localStorage.setItem("session", JSON.stringify(res));
    }

    secondModal.style.display = "none";
    modal.style.display = "flex";
  }
});

// timer
var initial = 3000;
var count = initial;
var counter;
var initialMillis;

function timer() {
  if (count <= 0) {
    document.getElementById("timer").innerHTML = "0:000 segundos";
    clearInterval(counter);
    finishGame();
    return;
  }

  var current = Date.now();

  count = count - (current - initialMillis);
  initialMillis = current;
  displayCount(count);
}

function displayCount(count) {
  var res = count / 1000;
  let convert = res.toString().replace(".", ":");
  console.log(convert);
  if (convert <= 3) {
    document.getElementById("timer").innerHTML = convert + ":000 segundos";
  } else {
    document.getElementById("timer").innerHTML = convert + " segundos";
  }
}

function startCounter() {
  clearInterval(counter);
  initialMillis = Date.now();
  counter = setInterval(timer, 1);
}

displayCount(initial);
