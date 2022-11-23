const nameForm = document.getElementById("nome");
const sobrenomeForm = document.getElementById("sobrenome");
const loginForm = document.getElementById("login");
const emailForm = document.getElementById("email");
const senhaForm = document.getElementById("senha");
const cepForm = document.getElementById("cep");
const enderecoForm = document.getElementById("endereco");
const complementoForm = document.getElementById("complemento");
const bairroForm = document.getElementById("bairro");
const cidadeForm = document.getElementById("cidade");
const estadoForm = document.getElementById("estado");
const githubForm = document.getElementById("github");
const academiaForm = document.getElementById("academia");
const professorForm = document.getElementById("professor");
const termoForm = document.getElementById("termos");
const infoForm = document.getElementById("professor");

const buttonSubmmit = document.querySelector(".btn");

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
    enderecoForm.value = cepData.logradouro;
    bairroForm.value = cepData.bairro;
    cidadeForm.value = cepData.localidade;
    estadoForm.value = cepData.uf;
  }
};

buttonSubmmit.addEventListener("click", (e) => {
  e.preventDefault();
  showResults();
});

const showResults = () => {
  document.getElementById("tabela-dados").classList.remove("d-none");
  document.getElementById("t-nome").innerHTML = nameForm.value;
  document.getElementById("t-sobrenome").innerHTML = sobrenomeForm.value;
  document.getElementById("t-email").innerHTML = emailForm.value;
  document.getElementById("t-login").innerHTML = loginForm.value;
  document.getElementById("t-senha").innerHTML = senhaForm.value;
  document.getElementById("t-cep").innerHTML = cepForm.value;
  document.getElementById("t-cidade").innerHTML = cidadeForm.value;
  document.getElementById("t-endereco").innerHTML = enderecoForm.value;
  document.getElementById("t-complemento").innerHTML = complementoForm.value;
  document.getElementById("t-bairro").innerHTML = bairroForm.value;
  document.getElementById("t-estado").innerHTML = estadoForm.value;
  document.getElementById("t-github").innerHTML = githubForm.value;
  document.getElementById("t-academia").innerHTML = academiaForm.value;
  document.getElementById("t-professor").innerHTML = professorForm.value;
  document.getElementById("t-termos").innerHTML = termoForm.value;
  document.getElementById("t-info").innerHTML = infoForm.value;
};
