var canvas      = document.getElementById("canvas");
var ctx          = canvas.getContext("2d",{antialias: true, antialiasSamples: 4});

var width       = window.innerWidth;
var height      = window.innerHeight;

canvas.width    = width;
canvas.height   = height;

var grid;
var masterBall;
var radius      = 50;

var pool        = [];
var poolLength  = 40;
var activeElements = [];

//COLOR IN RYB
//var fourColors  = [[255,0,0],[0,0,255],[0,255,0],[0,0,0],[255,255,255]];
var fourColors    = ["white","black","gold","steelblue","red"];
/*
 if(this.color=="red"&&target.color=="red"){target.color="red"}
 if(this.color=="white"&&target.color=="red"){target.color="white"}
 if(this.color=="Gold"&&target.color=="red"){target.color="orange"}
 if(this.color=="SteelBlue"&&target.color=="red"){target.color="MediumPurple"}
 if(this.color=="black"&&target.color=="red"){target.color="black"}

 */

var timer       = 0;

var main;
var pos         = {x:width/2};

var mission      = ["orange","green","mediumpurple"];
var missionNbr   = 10;
var allmissions  = [];
var activeMission= 0;

function onTouchStart(e){
    //Motion of the masterball when touched
    main.to({x:Math.ceil(e.changedTouches[0].pageX/grid.s) * grid.s - grid.s/2},500)
    .easing(TWEEN.Easing.Exponential.InOut)
    .onUpdate(function(){masterBall.x = pos.x;})
    .start();
}

function onTouchEnd(e){
    console.log("end");
}

function init(){
    masterBall.color = "white";
    allmissions = [];
    activeElements = [];
    activeMission = 0;
    //setup MISSION
    for(var i = 0;i<missionNbr;i++){
        var quantity = 1 + Math.random()*4;
        var m = [];
        for(var j = 0;j<quantity;j++){
            // m.push(mission[Math.floor(Math.random()*mission.length)]);
            var goal = new Circle(ctx,radius/2);
            
            goal.y = height-(radius/2)-5;
            goal.x =  width- (quantity*(radius+5)-radius/2) + ((j)*(radius+5));//width - ((j+1)*(radius+5))+radius/2;
            goal.color = mission[Math.floor(Math.random()*mission.length)];
            m.push(goal);
        }
        allmissions.push(m);
    }

}

function setup(){
    //set up tween
    main = new TWEEN.Tween(pos);
    //set up a grid
    grid = new Grid(ctx,width,height,radius*2);
    //set master ball
    masterBall = new Circle(ctx,radius);
    //masterBall.ryb([0,0,0]); // white in ryb
    masterBall.color = "white";
    masterBall.y = height-(3*radius);
    masterBall.x = width/2;
    //set the pool
    for(var i = 0;i<poolLength;i++){
        var c = new Circle(ctx,radius);
        c.y = -(2*radius);
        c.ID = i;
        pool.push(c);
    }
    
    //setup MISSION
    for(var i = 0;i<missionNbr;i++){
        var quantity = 1 + Math.round(Math.random()*4);
        console.log(quantity);
        var m = [];
        for(var j = 0;j<quantity;j++){
           // m.push(mission[Math.floor(Math.random()*mission.length)]);
            var goal = new Circle(ctx,radius/2);
            
            goal.y = height-(radius/2)-5;
            goal.x = width- (quantity*(radius+5)-radius/2) + ((j)*(radius+5))//+radius/2;
            goal.color = mission[Math.floor(Math.random()*mission.length)];
            m.push(goal);
        }
        allmissions.push(m);
    }
    
    document.addEventListener("touchstart", onTouchStart, false);
    document.addEventListener("touchend", onTouchEnd, false);
    draw();
}

function draw(){
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0,0,width,height);
    //adding element on stage after a certain time
    if(timer%50 == 0){
        timer = 0;
        pool[0].x = Math.floor(Math.random()*grid.w)*grid.s + grid.s/2;
        //pool[0].ryb( fourColors[Math.floor(Math.random()*fourColors.length)] );
        pool[0].color = fourColors[Math.floor(Math.random()*fourColors.length)];
        activeElements[pool[0].ID] = pool[0];
        var shifted = pool.shift();
    }
    //displaying the master
    masterBall.display();
    //parsing all balls
    for(var i in activeElements){
        //move the ball
        activeElements[i].move();
        //check color
        activeElements[i].check(masterBall);
        //display on screen
        activeElements[i].display();
        // put it back in pool
        if( activeElements[i].y >= height+radius){
            activeElements[i].y = -(2*radius);
            activeElements[i].canChangeColor = true;
            pool.push(activeElements[i]);
            delete activeElements[i];
        }
    }
    
    //showing the mission
    for(var i = 0;i<allmissions[activeMission].length;i++){
        //console.log("mission", allmissions[activeMission][i].color, allmissions[activeMission][i].x, allmissions[activeMission][i].y);
        allmissions[activeMission][i].display();
    }
    if(masterBall.color == allmissions[activeMission][0].color){
        console.log("same color !");
        //masterBall.color = "white";
        allmissions[activeMission].shift();
        
        if( allmissions[activeMission].length==0){
            activeMission++;
            if(activeMission >missionNbr){
                console.log("YOU RICHED ALL MISSIONS !!");
            }
        }
        //        activeMission++;
        //        if(activeMission >missionNbr){
        //            console.log("YOU RICHED ALL MISSIONS !!");
        //        }
    }else if(masterBall.color == "black"){
        console.log("you loose !!");
        init();
    }
    
    
    //showing grid
    //grid.show();
    timer++;
    TWEEN.update();
    requestAnimationFrame(draw);
}
setup();