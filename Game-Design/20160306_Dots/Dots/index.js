var w = window.innerWidth;
var h = window.innerHeight;
var scale = window.devicePixelRat

var canvas = document.getElementById('canvas');
canvas.width = w;// * scale;
canvas.height = h;// * scale;


var ctx = canvas.getContext('2d',{antialias:true, antialiassamples:4});
//ctx.scale(scale, scale);

var dots = [];
var angle = 0;

var targetNumber = 15;
var allTargets   = [];
var displayedTarget = [];
var center = {"x":w/2,"y":h/2};
var targetRadius = getDistance(0,0,w/2,h/2) +20;
var counter = 0;
var colors = ['green','yellow'];


function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function onTouchStart(e){
}
function onTouchEnd(e){
}
function onTouchMove(e){
    var mouseX = e.changedTouches[0].pageX;
    var mappedValue = mouseX.map(0,w,-180,180);
    for(var i=0;i<dots.length;i++){
        dots[i].move(mappedValue);
    }
    
}



function setup(){
    
    var bip = new Circle(w/2,h/2,30,ctx);
    bip.color = 'green';
    bip.movementRadius = 60;
    bip.difference =0;
    bip.init();
    dots.push(bip);

    var boop = new Circle(w/2,h/2,30,ctx);
    boop.color = 'yellow';
    boop.movementRadius = 60;
    boop.difference =180;
    boop.init();
    dots.push(boop);
    

    var new1 = new Circle(w/2, 10, 30, ctx);
    new1.color = 'yellow';
    
    var new2 = new Circle(w/2, 100, 30, ctx);
    new2.color = 'green';
    
    // create all target
    for(var i = 0;i<targetNumber;i++){
        var c = new Circle(center.x - targetRadius,h/2,10,ctx);
        c.ID = i;
        c.movementRadius = targetRadius;
        allTargets.push(c);
    }
    
    
    document.addEventListener('touchstart',onTouchStart);
    document.addEventListener('touchend',onTouchEnd);
    document.addEventListener('touchmove',onTouchMove);
    draw();
}

function draw(){
    //ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0,0,w,h);
    
    
    for(var i=0;i<dots.length;i++){
        //dots[i].move(angle);
        dots[i].draw();
    }
    
    for(var i in displayedTarget ){
        if(displayedTarget[i].movementRadius<=0 && displayedTarget[i].isMoving){
            //YOU LOOSE !!
            console.log("you loose");
            allTargets.push(displayedTarget[i]);
            delete displayedTarget[i];
        }else{
            displayedTarget[i].update();
            displayedTarget[i].draw();
            displayedTarget[i].check(dots);
        }
    }
    
    if(counter%30 == 0){
        var _shift  = allTargets.shift();
        var angle   = Math.random()*360;
        var posx    = Math.cos(angle)*targetRadius + center.x;
        var posy    = Math.sin(angle)*targetRadius + center.y;
        var color   = colors[Math.floor(Math.random()*colors.length)];
        _shift.x    = posx;
        _shift.y    = posy;
        _shift.angle = angle;
        _shift.color = color;
        _shift.isMoving = true;
        _shift.movementRadius = targetRadius;
        displayedTarget[_shift.ID] = _shift;
        counter = 0;
    }
    
    
    counter++;
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