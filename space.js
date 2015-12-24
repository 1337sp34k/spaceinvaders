//event listener
window.onkeydown = checkKey;
//game config
var canvas = document.getElementsByTagName('canvas')[0];
this.maxX = canvas.width;
this.maxY = canvas.height;
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
//create 2d array of invaders
//check collisions between invaders, missiles, and ship
//move ship
//key handler
function checkKey(event){
  event = event || window.event;
  if (event.keyCode == '37'){
    //move ship left
    moveShip(-5);
    drawShip();
  }
  else if (event.keyCode == '39') {
    //move ship right
    moveShip(5);
    drawShip();
  }
  else if (event.keyCode == '32') {
      //fire missile

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
  context.fillRect(this.ship.x, this.maxY-this.ship.height, this.ship.width, this.ship.height);
}
drawShip();
//draw invaders
//draw missiles
