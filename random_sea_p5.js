let bg, cols, rows, rez;
let xoff = 0;
let yoff = 0;
let incY = 0.1;
let inc = 0.1;
let terrain = [];
let deskT = 2;
let xT;
let yT;
let zT;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  rez = 25;
  canvas.position(0, 0);
  frameRate(30);
  strokeWeight(2);
  fill(25, 10, 60);  
  noFill();
  colorMode(HSB, 100);
  cols = floor(width*2 / rez);
  rows = floor(height*3 / rez);
  xT = -(cols * rez / 2 * 1.5);
  yT = -height * 2.4;
  zT = height / 3;
  for (let i = 0; i < rows+1; i++) {
    terrain[i] = [];
    storeRow(i);
    xoff = 0;
    yoff += inc;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width*2 / rez);
  rows = floor(height*3 / rez);  
}

function storeRow(index) {
  const halfCols = cols / 2;
  for (let j = 0; j < cols; j++) {
    if (abs(j - halfCols) < width / 200) {
      terrain[index][j] = map(noise(xoff, yoff), 0, 1, -30, 30);
    } else {
      terrain[index][j] = map(noise(xoff, yoff), 0, 1, -100, abs(j - halfCols) * 15);
    }
    xoff += inc;
  }
}

function draw() {
  translate(width / 2, height / 2, 50);
  rotateX(PI/2);
  translate(xT, yT, zT);
  clear();
  terrain.shift();
  terrain.push([]);
  storeRow(rows);
  xoff = 0;
  yoff += incY;
  for (let i = 0; i < rows; i++) {
    beginShape(TRIANGLE_STRIP);
    stroke(map(i, 0, rows-1, 100, 60), map(i, 0, rows-1, 255, 90), map(i, 0, rows-1, 255, 30));
    for (let j = 0; j < cols; j++) {
      vertex(j * rez, i * rez, terrain[i][j]);
      vertex(j * rez, (i + 1) * rez, terrain[i + 1][j]);
    }
    endShape();
  }
}
