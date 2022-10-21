// select all cells
const td = document.querySelectorAll("td");
const backBg = document.querySelector(".bg-modal");

console.log(backBg);

// modal setup
const modal = document.querySelector(".modal");
const buttonDismiss = document.querySelector("button");
const elementNameM = document.querySelector(".element-name");
const elementNumberM = document.querySelector(".element-number");
const elementDescM = document.querySelector(".element-desc");

// function for each cell
td.forEach((td) => {
  td.addEventListener("click", function () {
    modal.style.display = "block";
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
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
