let results = JSON.parse(localStorage.getItem("session"));
const tbody = document.querySelector("tbody");

let resultsSorted = results.sort((a, b) => (a.points > b.points ? 1 : b.points > a.points ? -1 : 0));

results.map((el) => {
  let tr = document.createElement("tr");
  Object.keys(el).map((prop) => {
    let td = document.createElement("td");
    td.innerHTML = el[prop];
    tr.appendChild(td);
  });

  tbody.appendChild(tr);
});
