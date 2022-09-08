//determine whether game starts //
var mode;

//Tint change numbers //
var BGTint = 170;
var TheTint = 10;


//Lantern empty shell and selection of Lanterns//
let Lanterns = [];
let LanternSel = [];

//Boat//
let ImgBoat;

//Lotus shell and image//
var lotuses = [];
var num_lotus = 7;
let LotusImg;

//Shell for the bokeh (lights)//
var bokeh = [];
var num_bokeh = 70;

function preload() {
  
 // Preloading all images//
  let LanternA = loadImage("Lanterns-01.png");
  let LanternB = loadImage("Lanterns-02.png");
  let LanternC = loadImage("Lanterns-03.png");
  let LanternD = loadImage("Lanterns-04.png");

  //Selection of Lanterns//
  LanternSel = [LanternA, LanternB, LanternC, LanternD];

  ImgBoat = loadImage("BoatAll.png");
  LotusImg = loadImage("Lotus1.png");
}

function setup() {
  mode = 0;
  createCanvas(600, 400);
  textSize(21);
  for (var b = 0; b < num_bokeh; b++) {
    bokeh[b] = new Bokehs();
  }
  for (var lo = 0; lo < num_lotus; lo++) {
    lotuses[lo] = new Lotus();
  }
}

function draw() {
  clear();
  
  //INITIALIZING SCREEN//
  if (mode == 0) {
    background(144,12,62);
    fill(253,253,252);
    text("Please enter to start", 220, 180);
    text("Mouse Click = Add Lanterns", 220, 220);
    text("Left/Right = Change Time", 220, 240);
  }
  
  //AFTER ENTER//
  if (mode == 1) {
    background (0,0,0);
    
    fill(144,12,62, BGTint);
  rect(0,0,width,height);

    //water//
    fill(0, 88, 152, 130);
    rect(0, (height * 3) / 4, width, height / 4);

    image(ImgBoat, 200, 220, 220, 100);

    for (var lo = 0; lo < num_lotus; lo++) {
      lotuses[lo].move();
      lotuses[lo].display();
    }

    for (var b = 0; b < num_bokeh; b++) {
      bokeh[b].move();
      bokeh[b].display();
      bokeh[b].addsize();
    }

    for (let lt = 0; lt < Lanterns.length; lt++) {
      Lanterns[lt].move();
      Lanterns[lt].show();
      Lanterns[lt].addsize();
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
    //starts the animation//
  }
  
  if (keyCode === UP_ARROW){
    //This changes the alpha value (transparancy)//
    BGTint += TheTint;

    if (BGTint > 225 || BGTint < 150) {
      TheTint = -TheTint;
    }
  }
}

function mousePressed() {
  //produces a new lantern//
  let lt = new Lantern(mouseX, mouseY);
  Lanterns.push(lt);
}

//Lanterns//////////////////////////////////////////////////
class Lantern {
  constructor(Ltx, Lty) {
    this.x = Ltx;
    this.y = Lty;
    this.randoImg = random(LanternSel);
    this.diameterOut = random(100, 150);
    this.diameterIn = random(30, 50);
    this.adddim = 2;
  }

  move() {
    //movement of lantern - floating//
    this.x = this.x + random(-1, 1);
    this.y -= 1;
  }

  show() {
    //light//
    fill(255, 50);
    noStroke();
    ellipse(this.x, this.y + 20, this.diameterOut);

    fill(255, 125);
    noStroke();
    ellipse(this.x, this.y + 25, this.diameterIn);

    fill(255, 186, 2);
    noStroke();
    ellipse(this.x, this.y + 30, 10);

    //lantern//
    image(this.randoImg, this.x - 38, this.y - 90, 75, 185);
  }

  addsize() {
    //changing lights so it flikers//
    this.diameterOut += random(-this.adddim, this.adddim);
    this.diameterIn += random(-this.adddim, this.adddim);

    if (this.diameterOut > 180 || this.diameterOut < 80) {
      this.adddim = -this.adddim;
    }
    if (this.diameterIn > 50 || this.diameterIn < 30) {
      this.adddim = -this.adddim;
    }
  }
}

//bokeh///////////////////////////////////////////////////////
class Bokehs {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 90);
    this.speed = 1;
    //B is random to add variety//
    this.colour = color(132, 8, random(255), 85);
    //change size//
    this.adddim = 2;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  addsize() {
    //erratic changing of diameters//
    this.diameter += random(-this.adddim, this.adddim);
  }

  display() {
    noStroke();
    fill(this.colour, 10);
    circle(this.x, this.y, this.diameter);
  }
}

// Lotus///////////////////////////////////////////////////////////
class Lotus {
  constructor() {
    this.x = random(width);
    this.y = random(300, 350);
    this.speed = 0.2;
  }

  move() {
    //changes direction when touching the edge of screen//
    this.x += this.speed;
    if (this.x > width || this.x < 0) {
      this.speed = -this.speed;
    }
  }

  display() {
    image(LotusImg, this.x, this.y, 50, 35);
  }
}
