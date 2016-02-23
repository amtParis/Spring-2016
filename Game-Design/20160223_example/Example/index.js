var w = window.innerWidth;
var h = window.innerHeight;
//var scale = window.devicePixelRat

var canvas = document.getElementById('canvas');
canvas.width = w;// * scale;
canvas.height = h;// * scale;

var ctx = canvas.getContext('2d');
//ctx.scale(scale, scale);

var quantity = 200;
var allCircles = [];
var target;
var showTarget = false;
var counter = 0;
var txt = "";
var goal = parseInt(Math.random()*120);

function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function add(){
    if(allCircles.length<quantity){
        var circle = new Circle(ctx);
        circle.init();
        allCircles.push(circle);
    }
}

function onTouchStart(e){
    goal = parseInt(Math.random()*120);
    txt = "Try to catch "+goal+" circles";
    counter = 0;
    target.r = 0;
    target.x = e.changedTouches[0].pageX;
    target.y = e.changedTouches[0].pageY;
    showTarget = true;
}
function onTouchEnd(e){
    showTarget = false;
    checkHowManyCircles();
}
function onTouchMove(e){
    target.x = e.changedTouches[0].pageX;
    target.y = e.changedTouches[0].pageY;
}
function checkHowManyCircles(){
    for(var i = 0;i<allCircles.length;i++){
        if(getDistance(target.x,target.y,allCircles[i].x,allCircles[i].y) <= target.r){
            counter++;
        }
    }
    //WRITE DOWN THE RESULT
    txt = "You've caught "+counter+" circles.";
    var diff = Math.abs(goal-counter);
    if(diff<=10){
        txt+= " SUPER HERO OF THIS GAME !"
    }else if(diff<=20){
        txt+=" Nice Catch.";
        
    }else{
        txt+=" My kids have done better...";
    }
    
}


function setup(){
    txt = "Try to catch "+goal+" circles";
    target = new Target(ctx);
    ctx.font = "20px Helvetica";
    document.addEventListener('touchstart',onTouchStart);
    document.addEventListener('touchend',onTouchEnd);
    document.addEventListener('touchmove',onTouchMove);
    draw();
}

function draw(){
    ctx.clearRect(0,0,w,h);
    
    if(showTarget){
        target.update();
        target.display();
    }
    
    add();
    for(var i=0;i<allCircles.length;i++){
        allCircles[i].move();
        allCircles[i].display();
    }
    
    //UI
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.fillText(txt,10,30);
    
    
    requestAnimationFrame(draw);
}

setup();