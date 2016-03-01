var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;
 var myFirstCircle;

var quantity = 50;
var allObstacles = [];
var displayedObstacles = [];
var counter = 0;

function setup(){
   myFirstCircle = new Circle(ctx);
   myFirstCircle.x = width/2;
   myFirstCircle.y = height/2;
   myFirstCircle.r = 50;
   myFirstCircle.color = "white";
    
    for(var i = 0;i<quantity;i++){
        var c = new Circle(ctx);
        c.x = width/2;
        c.y = -50;
        c.r = 50;
        allObstacles.push(c);
    }

  draw();
}

function draw(){
    ctx.clearRect(0,0,width,height);
    for(var i = 0;i<displayedObstacles.length;i++){
        displayedObstacles[i].move();
        displayedObstacles[i].display();
        
        if(displayedObstacles[i].y> height+50){
            var sh = displayedObstacles.shift();
            allObstacles.push(sh);
        }
        
        //check if obstacle touches the target
        if(getDistance(displayedObstacles[i].x,displayedObstacles[i].y,myFirstCircle.x,myFirstCircle.y)<= 100){
            var shi = displayedObstacles.shift();
            allObstacles.push(shi);
        }
    }
    
    if(counter > 150){
        counter = 0;
        var shifted = allObstacles.shift();
        displayedObstacles.push(shifted);
        console.log("element on screen", displayedObstacles.length);
    }
    
    counter++;
    
  myFirstCircle.display();
  requestAnimationFrame(draw);
}

setup();


//utils
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}