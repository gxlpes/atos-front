// select all cells
const td = document.querySelectorAll("td:not(.blank)");
const backBg = document.querySelector(".bg-modal");

// modal setup
const modal = document.querySelector(".modal");
const buttonDismiss = document.querySelector("button");

const elementNameM = document.querySelector(".modal-element-symbol");
const elementNumberM = document.querySelector(".modal-element-number");
const elementDescM = document.querySelector(".element-d");

// function for each cell
td.forEach((td) => {
  td.addEventListener("click", function () {
    modal.style.display = "flex";
    backBg.style.display = "block";

    let elementNumberT = td.querySelectorAll("p")[0].textContent;
    const elementNameT = td.querySelectorAll("p")[1].textContent;

    fetch("data.json")
      .then((response) => response.json())
      .then((json) => json.content[elementNumberT - 1].desc)
      .then((content) => (elementDescM.innerHTML = content));

    elementNumberM.innerHTML = elementNumberT;
    elementNameM.innerHTML = elementNameT;
  });
});

// button dismiss function
buttonDismiss.addEventListener("click", function () {
  modal.style.display = "none";
  backBg.style.display = "none";
});

// click anywhere modal
window.onclick = function (event) {
  if (event.target.className == "bg-modal") {
    modal.style.display = "none";
    backBg.style.display = "none";
  }
};
