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
//game loop
//create ship
function Ship(x){
  this.x = x;
  this.height = 20
  this.width = 25
}
this.ship = new Ship(this.maxX/2)
//create invaders
//create missiles
function Missile(x, y){
  this.x = x;
  this.y = y;
}
function invade(x, y){
  this.x = x;
  this.y = y;
  this.height = 10;
  this.width = 25;
}

function invadeArrs(){
  var rankFile = [];


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

//draw misiles
function drawMissile(missile){
  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('2d');
  context.fillStyle = 'red';
  context.fillRect(missile.x, missile.y, this.missWidth, this.missHeight);
}

//draw invaders
function drawInvade(){
  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('2d');
  context.fillRect(x, this.maxY-this.missHeight, this.missWidth, this.missHeight);
  context.fillStyle = 'green';
}
