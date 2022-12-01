let results = JSON.parse(localStorage.getItem("session"));
const table = document.querySelector("table");

results.map((el) => {
  let tr = document.createElement("tr");

  Object.keys(el).map((prop) => {
    let td = document.createElement("td");
    td.innerHTML = el[prop];
    tr.appendChild(td);
  });

  table.appendChild(tr);
});
