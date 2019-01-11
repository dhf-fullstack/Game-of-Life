const SIDE = 20

/* screen N x N
   now and next are N+1 x N+1 arrays with extra "dead" rows at top and bottom, columns an left and right
   eliminate edge cases when counting neighbors
   this makes now and next 1 based arrays!
   screen(row, col) is now[ (SIDE+2)*(row+1) + col) + 1 ]
*/

const now = new Array((SIDE+2)*(SIDE+2));
const next = new Array((SIDE+2)*(SIDE+2));

/* (row,col) to index */
function rc_to_i(r, c) {
  return ((SIDE+2)*(r+1) + c) + 1;
}

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
        where[rc_to_i(row, col)] = cells[SIDE*row + col].classList.contains("live") ? 1 : 0;
    }
  }
}

function copyToScreen(whence) {
  let cells = [...document.querySelectorAll(".cell")];
  for(let row = 0; row < SIDE; row++) {
    for(let col = 0; col < SIDE; col++) {
        cells[SIDE*row + col].classList.toggle("live", whence[rc_to_i(row, col)] === 1);
    }
  }
}

function run() {
  copyScreenTo(now);
  beFruitfulAndMultiply(now, next);
  copyToScreen(next);
  let t = now;
  now = next;
  next = now;
}

function randomize() {
  for(let row = 0; row < SIDE; row++) {
    for(let col = 0; col < SIDE; col++) {
        now[rc_to_i(row, col)] = Math.random() < .5 ? 1 : 0;
    }
  }
  copyToScreen(now);
}

function countNeighbors(a, r, c) {
  return a[rc_to_i(r-1, c-1)] + a[rc_to_i(r-1, c)]   + a[rc_to_i(r-1, c+1)] +
         a[rc_to_i(r,   c-1)] +                        a[rc_to_i(r,   c+1)] +
         a[rc_to_i(r+1, c-1)] + a[rc_to_i(r+1, c)]   + a[rc_to_i(r+1, c+1)];
}

function beFruitfulAndMultiply(now, next) {
  for(let row = 0; row < SIDE; row++) {
    for(let col = 0; col < SIDE; col++) {
      let neighbors = countNeighbors(now, row, col);
      next[rc_to_i(row, col)] = (neighbors < 2 || neighbors > 3) ? 0 : 1;
    }
  }
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