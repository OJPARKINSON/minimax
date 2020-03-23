const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const players = ['X', 'O'];
let currentPlayer;
const available = [];

function setup() {
  createCanvas(windowWidth / 2, windowHeight / 2);
  currentPlayer = random(players);
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}

function nextTurn() {
  const index = floor(random(available.length));
  const spot = available.splice(index, 1)[0];
  board[spot[0]][spot[1]] = currentPlayer;
  currentPlayer = random(players);
}

function mousePressed() {
  nextTurn();
}

function draw() {
  background(220);
  const w = width / 3;
  const h = height / 3;

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      const x = w * j + w / 2;
      const y = h * i + h / 2;
      const spot = board[i][j];
      textSize(32);
      strokeWeight(4);
      if (spot === players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot == players[0]) {
        const xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }
}
