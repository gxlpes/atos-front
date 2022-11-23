const nameForm = document.getElementById("nome");
const sobrenomeForm = document.getElementById("sobrenome");
const loginForm = document.getElementById("login");
const cepForm = document.getElementById("cep");

nameForm.addEventListener("change", () => {
  loginForm.value = nameForm.value.toLowerCase();
});

sobrenomeForm.addEventListener("change", () => {
  loginForm.value += "." + sobrenomeForm.value.toLowerCase();
});

cepForm.addEventListener("change", () => {
  if (cepForm.value.length == 8) {
    getDataFromCEP(cepForm.value);
  } else {
    document.getElementById("cep-erro").classList.remove("d-none");
  }
});

const getDataFromCEP = async (cep) => {
  let response = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
  let cepData = await response.json();
  setInputFormWithData(cepData);
};

const setInputFormWithData = (cepData) => {
  if (cepData.hasOwnProperty("erro")) {
    document.getElementById("cep-erro").classList.remove("d-none");
  } else {
    document.getElementById("cep-erro").classList.add("d-none");
    document.getElementById("endereco").value = cepData.logradouro;
    document.getElementById("bairro").value = cepData.bairro;
    document.getElementById("cidade").value = cepData.localidade;
    document.getElementById("estado").value = cepData.uf;
  }
};
