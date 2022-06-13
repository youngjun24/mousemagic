let bx;
let by;
let c = "#000000";
let w = 2;
let img;
let img2;
let boxSize = 10;
let overBox = false;
let locked = false;
let mouseClicked;

function preload() {
  img = loadImage("reset1.png");
  img2 = loadImage("icon.png");
  img3 = loadImage("shadow image.png")
}

class buttonClass {
  constructor (_r, _g, _b, _x, _y, _size, _kind) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.g = _g;
    this.b = _b;
    this.ro = 255;
    this.go = 255;
    this.bo = 255;
    this.mouseovered = 0;
    this.size = _size;
    this.kind = _kind; //"color", "random", "thickness", "stamp", "clear"
  }
  getColor() {
    return color(this.r, this.g, this.b);
  }
  mouseClicked(_x, _y) {
    if (dist(this.x, this.y, _x, _y)<this.size) {
      return true;
    } else {
      return false;
    }
  }
  mouseOver(_x, _y) {
    if (dist(this.x, this.y, _x, _y)<this.size) {
      this.mouseovered = 1;
    } else {
      this.mouseovered = 0;
    }
  }
  display() {
    if (this.kind=="random") {
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    }
    if (this.mouseovered==1) {
      fill(this.ro, this.go, this.bo);
    } else {
      fill(this.r, this.g, this.b);
    }
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
  }
  
}

let buttonsC = [];
let drawFlowerOk = false;
let ccc = [[255, 102, 102], [255,187,67], [255,252,148], [196,249,128], [102,255,196], [102,161,255], [219,141,255], [255,141,220], [0,0,0], [255,255,255]];

function setup() {
  bx = 17;
  by = 370;
  createCanvas(600, 400);
  //colorMode(HSB, 360, 100, 100, 100);
  background(233, 242, 255);
  noStroke();
  image(img3,0,0,595,345)//shadow
  rect(10,10,580,330);
  //colorMode(RGB, 360, 100, 100, 100);
  for (let i=0; i<10; i++) {
    buttonsC[i] = new buttonClass(ccc[i][0], ccc[i][1], ccc[i][2], bx+i*40, by, 15, "color");
  }
  let i = 10;
  buttonsC[i] = new buttonClass(0, 0, 0, bx+i*40, by, 15, "random");
}


function draw() { 
  
    if (
    mouseX > bx - boxSize &&
    mouseX < bx + boxSize &&
    mouseY > by - boxSize &&
    mouseY < by + boxSize
  ) {
    overBox = true;
    if (!locked) {
      fill(255);
    }
  } else {
    fill("#FF6666")
    overBox = false;
  }
  
  if (drawFlowerOk) {
    if (mouseX > 55 && mouseX < 545 && mouseY > 55 && mouseY < 297) {
      if (mouseIsPressed) {
        drawFlower(mouseX, mouseY);
      }
    }
  } else {
    if (mouseX > 10 && mouseX < 590 && mouseY > 10 && mouseY < 340) {
      if (mouseIsPressed) {
       stroke(c);
        strokeWeight(w);
        line(mouseX, mouseY, pmouseX, pmouseY);
      }
    }
  }

  noStroke();
  
  for (let i=0; i<11; i++) {
    buttonsC[i].display();
  }
  
  fill(0);//두께
  rectMode(CORNER);
  rect(450,362,15,15)
  
  /*fill(0);//스탬프
  rectMode(CORNER);
  rect(490,365,10,10)*/
  imageMode(CORNER);
  image(img2,485,359,20,20);
  
  
  
  imageMode(CORNER);
  image(img,560,355,30,30)
  
}

function drawFlower(x,y){
 imageMode(CENTER);
 image(img2,mouseX,mouseY,100,100)
}

function glow(glowColor, blurriness){
  drawingContext.shadowOffsetX = 10
  drawingContext.shadowOffsetY = 10
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}
function mouseMoved() {
  for (let i=0; i<11; i++) {
    buttonsC[i].mouseOver(mouseX, mouseY);
  }
}

function mousePressed() {
  
  for (let i=0; i<11; i++) {
    if (buttonsC[i].mouseClicked(mouseX, mouseY)) {
      drawFlowerOk = false;
      c = buttonsC[i].getColor();
      break;
    }
  }
  
  if (mouseX > 450 && mouseX < 465 && mouseY > 362 && mouseY < 377) {
    w = w+1
    if (w>7) {
    w = 2;//두께
    }
    drawFlowerOk = false;
  }
  if (mouseX > 485 && mouseX < 505 && mouseY > 359 && mouseY < 379) {
   //drawFlower();
    drawFlowerOk = true;
   noStroke(c);//스탬프
  }
  if (mouseX > 560 && mouseX < 590 && mouseY > 355 && mouseY < 385) {
    clearScreen();
    c = "#000000";
   drawFlowerOk = false;
  }
}




function clearScreen() {
  background(233, 242, 255);
  fill(255);
  imageMode(CORNER);
  image(img3,0,0,595,345)
  rect(10,10,580,330);
  w = 2;
}