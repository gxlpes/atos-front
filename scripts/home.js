// modal setup
const modal = document.querySelector(".modal");
const secondModal = document.querySelector(".second-modal");
const buttonDismiss = document.querySelector(".dismiss");
const buttonSaveProgress = document.querySelector(".save-progress");
const buttonSaveData = document.querySelector(".save-data");
const backBg = document.querySelector(".bg-modal");

const comoJogar = document.querySelector(".como-jogar");

comoJogar.addEventListener("click", () => {
  modal.style.display = "flex";
  backBg.style.display = "block";
});

buttonDismiss.addEventListener("click", () => {
  modal.style.display = "none";
  backBg.style.display = "none";
});
