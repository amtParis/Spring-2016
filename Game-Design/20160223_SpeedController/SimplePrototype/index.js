var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;
 var myFirstCircle;


function setup(){
   myFirstCircle = new Circle(ctx);
   myFirstCircle.x = 200;
   myFirstCircle.y = window.innerHeight-50;
   myFirstCircle.r = 50;

   //interaction
   document.addEventListener('mousedown', onMouseDown);
   document.addEventListener('mouseup', onMouseUp);

  draw();
}

function onMouseDown(e){
  myFirstCircle.isAllowToMove = false;
}
function onMouseUp(e){
  myFirstCircle.isAllowToMove = true;
  console.log(e);
  var mappedSpeedValue = e.pageY.map(0,window.innerHeight, 0,10);
  myFirstCircle.speed = mappedSpeedValue;
}

function draw(){
   //console.log("hello");
   ctx.clearRect(0,0,width,height)

   myFirstCircle.display();
   if(myFirstCircle.isAllowToMove){
     myFirstCircle.move();
   }
  requestAnimationFrame(draw);
}

setup();

//utils
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
