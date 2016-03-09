var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.getElementById('canvas');
canvas.width = w;
canvas.height =h;
var ctx = canvas.getContext('2d',{antialias:true,antialiasSamples:4});

var backgroundTexture;
var circles = [];
var radius = 20;
var colors = ["darkturquoise","dodgerblue","deepskyblue","lightskyblue","paleturquoise"];
// virtual mouses for multitouch storage
var virtualMouses = [];

var targets = [];
var targetSpeed = [-4,-2,2,4];


function addMouse(a,b,c){
    virtualMouses.push({"mouseX":a,"mouseY":b,"ID":c});
}

function ontouchstart(e){
    e.preventDefault();
    // initiate a new virtual mouse
    virtualMouses = [];
    for(var i=0;i<e.touches.length;i++){
        addMouse(e.touches[i].pageX,e.touches[i].pageY,e.touches[i].identifier);
    }
    //set all circles as clicked
    for(m=0;m<circles.length;m++){
        circles[m].multiClicked(virtualMouses);
    }
    
}

function ontouchend(e){
    e.preventDefault();
    //stop drag if release
    for(var q=0;q<e.changedTouches.length;q++){
        for(n=0;n<circles.length;n++){
            if(e.changedTouches[q].identifier == circles[n].ID){
                circles[n].stopDragging();
            }
        }
    }
}

function ontouchmove(e){
    e.preventDefault();
    
    //update virtual mouses
    virtualMouses = [];
    for(var o=0;o<e.touches.length;o++){
        addMouse(e.touches[o].pageX,e.touches[o].pageY,e.touches[o].identifier);
    }
    
}

function init(){
    console.log("YOU WIN ! (or you just started)");
    targets = [];
    circles = [];
    //iniate all circles on stage
    for(var i=0;i<colors.length;i++){
        var posx = Math.random()*window.innerWidth-40+20;
        var posy = Math.random()*window.innerHeight-40+20;
        var c = new Circle(ctx);
        c.radius = radius;
        c.x = Math.random()*(w-2*radius)+radius;
        c.y = h-radius;
        c.color = colors[i];
        circles.push(c);
        
        var target = new Circle(ctx);
        target.radius = 2*radius;
        target.x = Math.random()*(w-2*target.radius)+target.radius;
        target.y = (i+1)*(target.radius*2) - target.radius;
        target.color = colors[i];
        target.xSpeed = targetSpeed[Math.floor(Math.random()*targetSpeed.length)];
        targets.push(target);
    }

}


function setup(){
    backgroundTexture = new Image();
    backgroundTexture.src = 'data/background.jpg';
    
    //iniate all circles on stage
    init();
    //INTERACTION
    document.addEventListener('touchstart', ontouchstart);
    document.addEventListener('touchend', ontouchend);
    document.addEventListener('touchmove', ontouchmove);
    
    draw();


}

function draw(){
     ctx.drawImage(backgroundTexture,0,0,w,h);
    var winnerCount = 0;
    // display allCircles
    for(var i=0;i<circles.length;i++){
        circles[i].multiDrag(virtualMouses);
        (!circles[i].isTouched)?circles[i].draw():null;
        if( circles[i].dragging){
            circles[i].calculateSpeedValue(circles[i].x,circles[i].y);
        }
        //check with target
        circles[i].check(targets);
        
        //draw target
        (targets[i].isTouched)?targets[i].draw():targets[i].drawStroke();
        //update target position
        targets[i].x+= targets[i].xSpeed;
        if( targets[i].x<=targets[i].radius ||  targets[i].x>=w-targets[i].radius) targets[i].xSpeed*=-1
        if(targets[i].isTouched) winnerCount++;
    }
    
    if(winnerCount== colors.length) init();
    
    requestAnimationFrame(draw);
}
setup();

//utils
function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}