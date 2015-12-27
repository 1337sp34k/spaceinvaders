//event listener
window.onkeydown = checkKey;
//game config
var canvas = document.getElementsByTagName('canvas')[0];
this.maxX = canvas.width;
this.maxY = canvas.height;
this.missileV = 20;
this.missArr = [];
this.missHeight = 10;
this.missWidth = 2;
this.invaderGap = 5;
this.invaderHeight = 10;
this.invaderWidth = 25;
this.invaderDx = 5;
this.invaderDy = this.invaderGap + this.invaderHeight;
this.invaderMaxRow = 5;
this.invaderMaxCol = 6;
this.invaderArr = [];

//game loop
function gameLoop(){
  if(!gameOver(gameState)) {
    updateGame();
    drawGame();
  }
}

function updateGame(){
  //ship updated by key handler
  updateMissiles();
  //updateInvaders();
}

function drawGame(){
  //ship drawn by key handler
  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, this.maxX, this.maxY);
  drawShip();
  drawMissiles();
  //drawInvaders();
}

function gameOver(){
  false;
}
function gameState(){
  true;
}

/***************************************************
* Ship code --
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
    this.ship.x = this.maxX - this.ship.width;
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
  context.fillRect(this.ship.x,
    this.maxY-this.ship.height,
    this.ship.width,
    this.ship.height);
}
drawShip();

//create invaders
//create missiles

/***************************************************
* Missile code --
***************************************************/
function Missile(x, y){
  this.x = x;
  this.y = y;
}
//update missiles
function updateMissile(missile){
  //move missile by dy
  missile.y -= this.missileV;
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
* Invader code --
***************************************************/
function Invader() {
  this.alive = true;
}
function createInvaders(){
  for (row = 0; row < this.invaderMaxRow; row++){
    allCols = [];
    for(col = 0; col < this.invaderMaxCol; col++){
      allCols.push(new Invader());
    }
    this.invaderArr.push(allCols);
  }
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
    moveShip(-10);
    drawShip();
  }
  else if (event.keyCode == '39') {
    //move ship right
    moveShip(10);
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
setInterval(function () {gameLoop();}, 1000);
