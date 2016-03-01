var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d",{antialias: true, antialiasSamples: 4});

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var counter = 0;
var INC_counter = false;
var test_ball;

var circles = [];
var quantity = 15;

function onTouchStart(e){
    INC_counter = true;
}

function onTouchMove(e){
}

function onTouchEnd(e){
   INC_counter = false;
    //side impulse
    for(var i = 0;i<circles.length;i++){
        var distFromFinger = getDistance(e.changedTouches[0].pageX,e.changedTouches[0].pageY,circles[i].x,circles[i].y);
        var mappedDist = distFromFinger.map(0,height,50,0.9);
        var orientation = e.changedTouches[0].pageX - circles[i].x;
        var mappedOrientation = orientation.map(-width,width,1,-1);
        circles[i].vy = -counter*(Math.random()*3+1);
        circles[i].vx = counter/5*mappedOrientation*mappedDist;
    }
}

function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function setup(){
    for(var i = 0;i<quantity;i++){
        var c = new Circle(ctx);
        c.x = Math.random()*(width-100)+50;
        c.y = height-50;
        c.r = 50;
        circles.push(c);
    }
    
      //interaction
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
    
    draw();
}



function draw(){
    ctx.clearRect(0,0,width,height);
    (INC_counter)?counter++:(counter>0)?counter--:null;
    
     for(var i = 0;i<circles.length;i++){
         circles[i].move();
         circles[i].display();
     }
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
