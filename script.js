const getInputData = () => {
  return document.querySelector(".inputTemp").value;
};

const calculateTemp = (inputData) => {
  return (celiusConverted = (inputData - 32) / 1.8);
};

const appendResult = (resultData) => {
  const getResultSection = document.querySelector(".result");
  getResultSection.innerHTML = resultData;
};

const convertType = document.querySelector(".submitButton").addEventListener("click", () => {
  let inputData = getInputData();
  let resultData = calculateTemp(inputData);
  appendResult(resultData);
});
