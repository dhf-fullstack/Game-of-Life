const SIDE = 20

const now = new Array(SIDE*SIDE);
const next = new Array(SIDE*SIDE);

now.fill(0);
next.fill(0);

let field = document.querySelector('#field')
for(let row = 0; row < SIDE; row++) {
  let r = document.createElement('tr');
  for(let col = 0; col < SIDE; col++) {
    let d = document.createElement('td');
    r.appendChild(d);
    let cell = document.createElement('div')
    cell.classList.add("cell")
    d.appendChild(cell);
  }
  field.appendChild(r);
}

const btnRun = document.querySelector('#run')
btnRun.addEventListener("click", run)

const btnRandomize = document.querySelector('#random')
btnRandomize.addEventListener("click", randomize)

function cellClick(event) {
  console.log("CLICK");
  event.target.classList.toggle("live");
}

[...document.querySelectorAll(".cell")].forEach(e => e.addEventListener("click", cellClick));

function copyScreenTo(where) {
  let cells = [...document.querySelectorAll(".cell")];
  for(let row = 0; row < SIDE; row++) {
    for(let col = 0; col < SIDE; col++) {
        where[SIDE*row + col] = cells[SIDE*row + col].classList.contains("live") ? 1 : 0;
    }
  }
}

function copyToScreen(whence) {
  let cells = [...document.querySelectorAll(".cell")];
  for(let row = 0; row < SIDE; row++) {
    for(let col = 0; col < SIDE; col++) {
        cells[SIDE*row + col].classList.toggle("live", whence[SIDE*row + col] === 1);
    }
  }
}

function run() {
  copyScreenTo(now);
}

function randomize() {
  for(let row = 0; row < SIDE; row++) {
    for(let col = 0; col < SIDE; col++) {
        now[SIDE*row + col] = Math.random() < .5 ? 1 : 0;
    }
  }
  copyToScreen(now);
}

/*
document.querySelector('table')

let makeRow = () => {
    let newRow = document.createElement('tr')
    for(let i = 0; i < 20; i++){
      let cells = document.createElement('td')
      newRow.appendChild(cells)
    }
    newTable.appendChild(newRow)
}

const button = document.querySelector('#add-row')
button.addEventListener("click", makeRow)

function tableClick(event) {
  event.target.classList.add("yellow");
}

newTable.addEventListener("click", tableClick);
*/