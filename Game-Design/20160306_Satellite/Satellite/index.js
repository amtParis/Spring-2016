var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d",{antialias:true,antialiasSample:4});

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var satelliteCounter = 0;
var allSatellites = [];
var center = {"x":width/2,"y":height/2};

function onTouchStart(e){
    satelliteCounter++;
    var circle = new Circle(ctx);
    circle.x = e.changedTouches[0].pageX;
    circle.y = e.changedTouches[0].pageY;
    circle.r = 1;
    circle.center = center;
    allSatellites[satelliteCounter] = circle;
}

function onTouchMove(e){
     allSatellites[satelliteCounter].x =  e.changedTouches[0].pageX;
     allSatellites[satelliteCounter].y =  e.changedTouches[0].pageY;
}

function onTouchEnd(e){
    allSatellites[satelliteCounter].isGrowing = false;
    allSatellites[satelliteCounter].radius = getDistance(e.changedTouches[0].pageX,e.changedTouches[0].pageY,center.x,center.y);
    allSatellites[satelliteCounter].angle = getAngle(e.changedTouches[0].pageX,e.changedTouches[0].pageY,center.x,center.y);
}

function setup(){
    
    //interaction
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
    draw();
}

function draw(){
    ctx.clearRect(0,0,width,height);
    for(var i in allSatellites){
        allSatellites[i].update();
        allSatellites[i].display();
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
//angle between 2 points
function getAngle(x2,y2,x1,y1){
    return Math.atan2(y2-y1,x2-x1)*180/Math.PI;
}