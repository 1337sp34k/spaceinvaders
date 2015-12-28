//event listener
window.onkeydown = checkKey;
//game config
var canvas = document.getElementsByTagName('canvas')[0];
this.maxX = canvas.width;
this.maxY = canvas.height;
this.missileV = 5;
this.missArr = [];
this.missHeight = 10;
this.missWidth = 2;
this.invaderGap = 5;
this.invaderHeight = 10;
this.invaderWidth = 25;
this.invaderDx = 1;
this.invaderDy = 5/*this.invaderGap + this.invaderHeight*/;
this.invaderMaxRow = 5;
this.invaderMaxCol = 6;
this.invaderArr = [];
this.invaderInitX = 100;
this.invaderInitY = 100;
this.invaderX = 50;
this.invaderY = 50;
this.direction = 1;
//this.gameOver = false;
this.intervalID = 0;

function missileHits(){
  for (row = 0; row < this.invaderMaxRow; row++){
    for(col = 0; col < this.invaderMaxCol; col++){
      if (this.invaderArr[row][col].alive) {
        for (nextMissile in this.missArr) {
          if (rectOver(this.invaderX + (this.invaderGap + this.invaderWidth) * col,
                  this.invaderY + (this.invaderGap + this.invaderHeight) * row,
                  this.invaderWidth,
                  this.invaderHeight,
                  this.missArr[nextMissile].x,
                  this.missArr[nextMissile].y,
                  this.missWidth,
                  this.missHeight)) {    //check if missile overlaps with invader
                  // kill invader
                  this.invaderArr[row][col].alive = false
                  // remove missile from array
                  this.missArr.splice(nextMissile, 1);
          }
        }
    }
    }
  }
}

function shipHit(){
  for (row = 0; row < this.invaderMaxRow; row++){
    for (col = 0; col < this.invaderMaxCol; col++){
        if (rectOver(this.invaderX + (this.invaderGap + this.invaderWidth) * col,
                this.invaderY + (this.invaderGap + this.invaderHeight) * row,
                this.invaderWidth,
                this.invaderHeight,
                this.ship.x,
                this.maxY-this.ship.height,
                this.ship.width,
                this.ship.height)) {  //game over
                return true;
        }
      }
    }
  return false;
}
function hitBottom(){
  if (this.direction == 1) {
    for (var col = this.invaderMaxCol - 1; col >= 0; col--) {
      for (var row = 0; row < this.invaderMaxRow; row++) {
        var invader = this.invaderArr[row][col];
        if (invader.alive) {
          if (this.maxy - (this.invadery + (this.invaderGap + this.invaderHeight) * col) - this.invaderHeight <= 500){
            return true;
          }
        }
      }
    }
  }
  return false;
}

function noInvade(){
  for (row = 0; row < this.invaderMaxRow; row++){
    for(col = 0; col < this.invaderMaxCol; col++){
      if(this.invaderArr[row][col].alive) {
        return false;
      }
    }
  }
  return true;
}




function rectOver(x1, y1, w1, h1, x2, y2, w2, h2){
  if (x2 < x1 + w1 && x1 < x2 + w2 && y2 < y1 + h1)
    return y1 < y2 + h2;
  else
    return false;
}

//game loop
function gameLoop() {
  if(gameOver()) {
    clearInterval(this.intervalID);
    console.log("Game over!");
  } else {
    updateGame();
    drawGame();
  }
}

function updateGame(){
  //ship updated by key handler
  missileHits();
  updateMissiles();
  updateInvaders();
}

function drawGame(){
  //ship drawn by key handler
  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, this.maxX, this.maxY);
  drawShip();
  drawMissiles();
  drawInvaders(this.invaderX, this.invaderY);
}

function gameOver(){
  return shipHit() || noInvade() || hitBottom()
}

function gameState(){
  true;
}

/***************************************************
* Ship code
***************************************************/
//create ship
function Ship(x){
  this.x = x;
  this.height = 20
  this.width = 25
}
this.ship = new Ship(this.maxX/2)

//move ship
function moveShip(dist){
  this.ship.x += dist;
  if (this.ship.x < 0){
    this.ship.x = 0
  }
  else if (this.ship.x > this.maxX - this.ship.width) {
    this.ship.x = this.maxX - this.ship.width

  }
}
//draw ship
function drawShip(){
  //get canvas
  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('2d');
  //clear ship area
  context.clearRect(0, this.maxY-this.ship.height, this.maxX, this.ship.height);
  //draw ship
  context.fillStyle = 'black';
  context.fillRect(this.ship.x, this.maxY-this.ship.height, this.ship.width, this.ship.height);
}
drawShip();

//create invaders
//create missiles

/***************************************************
* Missile code
***************************************************/
function Missile(x, y){
  this.x = x;
  this.y = y;
}

function updateMissiles(){
  for (nextMissile in this.missArr) {
    updateMissile(this.missArr[nextMissile]);
  }
}


//draw misiles
function drawMissile(missile){
  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('2d');
  context.fillStyle = 'red';
  context.fillRect(missile.x, missile.y, this.missWidth, this.missHeight);
}
function drawMissiles(){
  for (nextMissile in this.missArr) {
    drawMissile(this.missArr[nextMissile]);
  }
}
/***************************************************
* Invader code
***************************************************/
function Invader() {
  this.alive = true;
}
//flls invader array
function createInvaders(){
  for (row = 0; row < this.invaderMaxRow; row++){
    allCols = [];
    for(col = 0; col < this.invaderMaxCol; col++){
      allCols.push(new Invader());
    }
    this.invaderArr.push(allCols);
  }
}

//update invaders
function updateInvaders(){
  //move invader array
  this.invaderX += this.invaderDx * this.direction;
  //this.invaderY += this.invaderDy;

  //check if hit side(change direction)
  if (hitWall()){
    this.direction *= -1;
    this.invaderY += this.invaderDy;
  }
  this.invaderX += this.invaderDx * this.direction;

  //check if hit bottom

  //check if hit missile
}

function hitWall(){
  if (this.direction == 1) {
    for (var col = this.invaderMaxCol - 1; col >= 0; col--) {
      for (var row = 0; row < this.invaderMaxRow; row++) {
        var invader = this.invaderArr[row][col];
        if (invader.alive) {
          if (this.maxX - (this.invaderX + (this.invaderGap + this.invaderWidth) * col) - this.invaderWidth <= 0){
            return true;
          }
        }
      }
    }
  } else if (this.direction == -1) {
    for (var col = 0; col < this.invaderMaxCol; col++) {
      for (var row = 0; row < this.invaderMaxRow; row++) {
        var invader = this.invaderArr[row][col];
        if (invader.alive) {
          if ((this.invaderX + this.invaderWidth * col) <=0){
            this.invaderX = 0;
            return true;
          }
        }
      }
    }
  }
  return false;
}


//draw invader
function drawInvaders(x, y){
  for (row = 0; row < this.invaderMaxRow; row++){
    for(col = 0; col < this.invaderMaxCol; col++){
      drawInvader(this.invaderArr[row][col],
        x + (this.invaderGap + this.invaderWidth) * col,
        y + (this.invaderGap + this.invaderHeight) * row);
    }
  }
}

//draw invader
function drawInvader(invader, x, y){
  if (invader.alive){
    var canvas = document.getElementsByTagName('canvas')[0];
    var context = canvas.getContext('2d');
    context.fillStyle = 'green';
    context.fillRect(x, y, this.invaderWidth, this.invaderHeight);
  }
}

//create 2d array of invaders
//check collisions between invaders, missiles, and ship
//key handler
function checkKey(event){
  event = event || window.event;
  if (event.keyCode == '37'){
    //move ship left
    moveShip(-15);
    drawShip();
  }
  else if (event.keyCode == '39') {
    //move ship right
    moveShip(15);
    drawShip();
  }
  else if (event.keyCode == '32') {
      //fire missile
      var missile = new Missile(this.ship.x + this.ship.width/2 - this.missWidth/2,
              this.maxY - this.ship.height - this.missHeight);
      this.missArr.push(missile);
      drawMissile(missile);
  }
}
drawShip();
createInvaders();
this.intervalID = setInterval(function () {gameLoop();}, 10);
