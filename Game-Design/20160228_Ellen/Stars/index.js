var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var stars = [];
var starLength = 150;
var allGroups = [];
var touchCounter = 0;

const MOVE_WHEN_TOUCHED = true;

function onTouchStart(e){
   //create a new GROUP
    allGroups[touchCounter] = [];
}

function onTouchMove(e){
    //add lines in group if finger is next to a star (20 px)
    for(var i =0;i<stars.length;i++){
        if(getDistance(e.changedTouches[0].pageX,e.changedTouches[0].pageY,stars[i].x,stars[i].y) <= 20 && !stars[i].isTouched){
            allGroups[touchCounter].push(stars[i]);
            stars[i].identifier = touchCounter;
            stars[i].isTouched = true;
        }
    }
}

function onTouchEnd(e){
    //if there is no star stored in the group, we delete the group
    if(allGroups[touchCounter].length <=1){
        console.log("nothing in the group");
        while(allGroups[touchCounter].length>0){
            var shifted = allGroups[touchCounter].shift();
            shifted.isTouched = false;
        }
        delete allGroups[touchCounter];
    }else{
        // if SETTING is true, we make the group moving, with a random speed
        if(MOVE_WHEN_TOUCHED){
            var s = Math.random()*2 + 1;
            for(var i = 0;i<allGroups[touchCounter].length;i++){
                allGroups[touchCounter][i].shapeMotion = true;
                allGroups[touchCounter][i].speedUp = s;
            }
        }
    }
    touchCounter++;
}

function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function setup(){
    //we create all the stars
    for(var i = 0;i<starLength;i++){
        var star = new Circle(ctx);
        star.position(Math.random()*width,Math.random()*height);
        star.r = 1;
        stars.push(star);
    }
    //interaction
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
    
    draw();
}



function draw(){
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,width,height);
    // display all stars ----------------------------
    for(var i = 0;i<stars.length;i++){
        stars[i].move();
        stars[i].display();
        //check if stars are out of screen
        if(stars[i].y<-height){
            //reinit
             stars[i].position(Math.random()*width,Math.random()*height);
             stars[i].isTouched = false;
             stars[i].shapeMotion = false;
             stars[i].colors = ["rgba(255,0,0,1)","rgba(255,0,0,0.2)"];
             // remove the group
             delete allGroups[stars[i].identifier];
        }
    }
    // display all lines ---------------------------
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    for(var i in allGroups){
        if(allGroups[i][0]!=undefined){
            ctx.beginPath();
            ctx.moveTo(allGroups[i][0].x,allGroups[i][0].y);
            for(var k = 1;k < allGroups[i].length;k++){
                ctx.lineTo(allGroups[i][k].x,allGroups[i][k].y);
            }
            ctx.lineTo(allGroups[i][0].x,allGroups[i][0].y);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }
    requestAnimationFrame(draw);
}
setup();