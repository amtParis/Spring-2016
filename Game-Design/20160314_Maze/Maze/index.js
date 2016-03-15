var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;
var myFirstCircle;
var allMyCircles = [];

var mazeUnit = 150;
var mazeElements = [];
var isMoving = false;
var speedY = 10;
var speed = 0;
var score = 0;

function initMaze(){
  var id = 0;
  for(var i = 0; i<height; i+=mazeUnit){
    var m = new MazeElement(ctx);
    m.x = width/2-mazeUnit/2 + Math.round(1-Math.random()*2)*mazeUnit;
    m.y = height - i - mazeUnit;
    m.speed = Math.random()*2+1;
    m.side = mazeUnit;
    m.ID = id;
    mazeElements.push(m);
    id++;
  }
}

function initGame(){
  mazeElements = [];
  allMyCircles = [];
  initMaze();
  console.log("init");
  //This is your player
  myFirstCircle = new Circle(ctx);
  myFirstCircle.x = 200;
  myFirstCircle.y = window.innerHeight-50;
  myFirstCircle.r = 20;

  //let's create some obstacles to complicate the game
  for(var i=0;i<20;i++){
      var myCircle = new Circle(ctx);
      myCircle.x = Math.random()*width;
      myCircle.y = Math.random()*(height-mazeUnit);
      myCircle.r = 20;
      myCircle.color= 'black';
      allMyCircles.push(myCircle);
  }
}


function setup(){
    initGame();
    document.body.addEventListener('keydown',onKeyDown);
    document.body.addEventListener('keyup',onKeyUp);
    draw();
}

function onKeyUp(e){
  isMoving = false;
}

function onKeyDown(e){
  console.log(e);
  isMoving = true;
  switch(e.keyCode){
    //left
    case 37:
    break;
    //UP
    case 38:
      speed = -speedY
    break;
    //right
    case 39:
    break;
    //DOWN
    case 40:
      speed = speedY;
    break;
  }
}

function draw(){

    //console.log("hello");

    ctx.clearRect(0,0,width,height);
    ctx.font = "30px Arial";
    ctx.fillText("Score : " + score,10,30);

    //Let's draw the obstacles
    for(var i=0;i<20;i++){
        allMyCircles[i].display();
    }

    //let's draw the moving blocks
    for(var i = 0;i<mazeElements.length;i++){
      mazeElements[i].move();
      mazeElements[i].display();
    }
    myFirstCircle.check(allMyCircles);
    myFirstCircle.update(mazeElements,speed);
    myFirstCircle.display();
    requestAnimationFrame(draw);
}
setup();



//utils
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
//utils
function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}
