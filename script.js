/* screen N x N ("SIDE")
   'now' and 'next' are N+1 x N+1 arrays with extra "dead" rows
    at top and bottom, columns an left and right; to
    eliminate edge cases when counting neighbors.
    'now' and 'next' are 1 based arrays:
    screen(row, col) => now[ (SIDE+2)*(row+1) + col) + 1 ]
*/

const SIDE = 20
var now = new Array((SIDE+2)*(SIDE+2))
var next = new Array((SIDE+2)*(SIDE+2))

now.fill(0);
next.fill(0);

/* start and stop continuous evolution */

var shouldRun = false

/* map (row,col) to index */
function rc_to_i(r, c) {
  return ((SIDE+2)*(r+1) + c) + 1
}

/* set up the DOM - the field is a table */

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

const btnOnce = document.querySelector('#once')
btnOnce.addEventListener("click", once)

const btnRun = document.querySelector('#run')
btnRun.addEventListener("click", run)

const btnEnuff = document.querySelector('#enuff')
btnEnuff.addEventListener("click", enuff)

const btnRandomize = document.querySelector('#random')
btnRandomize.addEventListener("click", randomize)

/* The player can initialize the field by clicking cells to toggle between life & death */

function cellClick(event) {
  console.log("CLICK");
  event.target.classList.toggle("live");
}

[...document.querySelectorAll(".cell")].forEach(e => e.addEventListener("click", cellClick));

/* Copy between screen & arrays */

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

/* Evolve! */

function once() {
  copyScreenTo(now);
  beFruitfulAndMultiply(now, next);
  copyToScreen(next);
}

function run() {
  shouldRun = true;
  copyScreenTo(now);
  run1();
}

function run1() {
  if (shouldRun) {
    beFruitfulAndMultiply(now, next);
    copyToScreen(next);
    let t = now;
    now = next;
    next = t;
    setTimeout(run1, 1000);
  }
}

function enuff() {
  console.log("enuff!");
  shouldRun = false;
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
