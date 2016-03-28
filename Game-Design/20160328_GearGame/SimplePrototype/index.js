var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d",{ antialias:true, antialiasSamples:4, alpha: false});

var width = window.innerWidth; // dimensions of our screen
var height = window.innerHeight; // dimensions of our screen
var level = 1;
var levelScreenStartTime;
var LEVEL_MESSAGE_DURATION = 2500;
var showSplashScreen = true;
var startGame = true;

//TODO:move to json file
var levels = {
    "level-1": {
        "message": "Entering Level 1",
        "gears": [
                  {
                  "position": { "x": 300, "y": 300 },
                  "arms": [
                           { "angle": 45, "length": 120, "speed": 2 },
                           { "angle": 90, "length": 120, "speed": 2 },
                           { "angle": 135, "length": 150, "speed":2 },
                           { "angle": 180, "length": 140, "speed": 2.2 },
                           { "angle": 225, "length": 140, "speed":2.2}
                    ]
                  }
                  ]
    },
    "level-2": {
        "message": "Level 2",
        "gears": [
                  {
                  "position": { "x": 0, "y": 100 },
                  "arms": [
                           { "angle": 45, "length": 180, "speed": 1.6 },
                           { "angle": 90, "length": 180, "speed": 2 },
                           { "angle": 135, "length": 180, "speed": 2 }
                           ]
                  },
                  {
                  "position": { "x": width, "y": 380 },
                  "arms": [
                           { "angle": 45, "length": 180, "speed": 2.6 },
                           { "angle": 90, "length": 180, "speed": 2.6 },
                           { "angle": 135, "length": 180, "speed": 2.6 },
                           { "angle": 180, "length": 180, "speed": 2.6 },
                           { "angle": 225, "length": 180, "speed": 2.6 }
                           ]
                  }
        ]
    },
    "level-3": {
        "message": "Level 3",
        "gears": [
                  {
                  "position": { "x": 0, "y": 400 },
                  "arms": [
                           { "angle": 0, "length": 180, "speed": 2.3 },
                           { "angle": 120, "length": 180, "speed": 2.3 },
                           { "angle": 240, "length": 180, "speed": 2.3 }
                           ]
                  },
                  {
                  "position": { "x": width, "y": 0 },
                  "arms": [
                           { "angle": 0, "length": 180, "speed": 2.3 },
                           { "angle": 120, "length": 180, "speed": 2.3 },
                           { "angle": 240, "length": 180, "speed": 2.3 }
                           ]
                  }
                  ]
    },
    //TODO:FINISH LAYOUT OF LEVELS
    "level-4": {
        "message": "Level 4",
        "gears": [
                  {
                  "position": { "x": 70, "y": 100 },
                  "arms": [
                           { "angle": 0, "length": 180, "speed": 2.3 },
                           { "angle": 120, "length": 180, "speed": 2.3 },
                           { "angle": 240, "length": 180, "speed": 2.3 }
                           ]
                  },
                  {
                  "position": { "x": 150, "y": 200 },
                  "arms": [
                           { "angle": 0, "length": 180, "speed": 2.3 },
                           { "angle": 120, "length": 180, "speed": 2.3 },
                           { "angle": 240, "length": 180, "speed": 2.3 }
                           ]
                  },
                  {
                  "position": { "x": 125, "y": 20 },
                  "arms": [
                           { "angle": 0, "length": 180, "speed": 2.3 },
                           { "angle": 120, "length": 180, "speed": 2.3 },
                           { "angle": 240, "length": 180, "speed": 2.3 }
                           ]
                  },
                  ]
    },
    "level-5": {
        "message": "Level 5",
        "gears": [
                  {
                  "position": { "x": 30, "y": 50 },
                  "arms": [
                           { "angle": 0, "length": 180, "speed": 2.3 },
                           { "angle": 120, "length": 180, "speed": 2.3 },
                           { "angle": 240, "length": 180, "speed": 2.3 }
                         ]
                  },
                  {
                  "position": { "x": 70, "y": 100 },
                  "arms": [
                           { "angle": 0, "length": 180, "speed": 2.3 },
                           { "angle": 120, "length": 180, "speed": 2.3 },
                           { "angle": 240, "length": 180, "speed": 2.3 }
                        ]

                  },
                  {
                  "position": { "x": 150, "y": 200 },
                  "arms": [
                           { "angle": 0, "length": 180, "speed": 2.3 },
                           { "angle": 120, "length": 180, "speed": 2.3 },
                           { "angle": 240, "length": 180, "speed": 2.3 }
                        ]
                  }
                  ]
    }
};

var JSONLEVELS;


canvas.width = width;
canvas.height = height;


 var cursorCircle;
 // array for gears
 var gears = [];
 var gameOver = false;

 function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
 }
//
//// manual audio set-up
//    var audio = document.createElement('audio');
//    audio.src = "data/name.mp3";
//    // we want to load every sound at beg.
//    audio.preload = true;
//    // good for ambient sound
//    audio.loop = false;
//    audio.load();
//    //
//    document.body.appendChild(audio);
//    // i.e. create variables for each element of sound - starting sound, death sound, etc. 
//    varaiable.play();
//


// source: http://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
//function loadJSON(path, callback) {
////    console.log("\n\n\n\n Called load file.\n\n\n\n")
//    
//    var xobj = new XMLHttpRequest();
////    xobj.overrideMimeType("application/json");
//    xobj.open('GET', path);
//    xobj.send();
//    xobj.onreadystatechange = function () {
//        if (xobj.readyState == 4 && xobj.status == "200") {
//            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//            callback(xobj.responseText);
//        }
//        
////        console.log("\n\n\n\n Failed to load file.\n\n\n\n", path, xobj.status, xobj.error)
//    };
//}

function loadJSON(path,callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if( request.readyState == request.DONE && request.status == 200 ) {
            var json = JSON.parse(request.responseText);
            callback(json);
        }
    }
    request.open('GET', path);
    request.send();
}

function setupLevelGears(levelGears){
    //clean gears
    gears = [];
    for (var i = 0; i < levelGears.length; i++){
        gears[i] = new Gear(ctx);
        gears[i].setPosition(levelGears[i].position.x, levelGears[i].position.y);
        for(var j = 0; j < levelGears[i].arms.length; j++){
            gears[i].addPoint(
                levelGears[i].arms[j].length,
                levelGears[i].arms[j].angle,
                levelGears[i].arms[j].speed
            );
        }
    }
    level++;
}



function setup(){
    //start the circle
    cursorCircle = new Circle(ctx);
    resetCircle(cursorCircle)
    //interaction
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);
    
    //load LEVELS
    loadJSON("GearGame/SimplePrototype/levels.json", levelsReady);
             
    //draw();
}

function levelsReady(json){
    JSONLEVELS = json;
    draw();
   // console.log(json);
}

function onTouchStart(e){
    cursorCircle.isAllowToMove = false;
    cursorCircle.color ="rgba(255,255,255,0.2)";
}
function onTouchEnd(e){
    cursorCircle.isAllowToMove = true;
    cursorCircle.color = "rgba(255,255,255,1)";
//    console.log(e);
    
    var mappedSpeedValue = e.changedTouches[0].pageY.map(0,window.innerHeight, 0,8);
        cursorCircle.speed = mappedSpeedValue;
}

function newLevel(){
    return (cursorCircle.y - cursorCircle.r)  > height
}

function resetCircle(c){
    c.x = width/2;
    c.y = height - 40;
    c.r = 20;
}

function showMessage(ctx, message, font, color, offset){
    offset = offset || 0;
    ctx.font = font || "20px Helevetica";
    ctx.fillText(message, width/2, height/2 + offset);
    ctx.textAlign = 'center';
    ctx.fillStyle = color || "rgba(150,255,150,1)";
}


function draw(){
    if(showSplashScreen){
        showMessage(ctx, "Welcome to","25px Helvetica Neue",  "rgba(200,50,50,1)", -15);
        showMessage(ctx, "GearGame (GG)","25px Helvetica Neue",  "rgba(200,50,50,1)", 15);
        if(!levelScreenStartTime) {
            levelScreenStartTime = new Date().getTime();
        } else if((new Date().getTime() - levelScreenStartTime) > LEVEL_MESSAGE_DURATION) {
            levelScreenStartTime = null;
            showSplashScreen = false;
            startGame = true;
        }
    } else {
        ctx.clearRect(0,0,width,height)
        if(!gameOver && (startGame || newLevel()) && levels["level-" + level]){
            if(levelScreenStartTime && (new Date().getTime() - levelScreenStartTime) > LEVEL_MESSAGE_DURATION){
                startGame = false;
                resetCircle(cursorCircle)
                setupLevelGears(JSONLEVELS["level-" + level].gears);
                levelScreenStartTime = null;
                gameOver = false;
            } else if (startGame || levelScreenStartTime){
                levelScreenStartTime = levelScreenStartTime || new Date().getTime();
                showMessage(ctx, levels["level-" + level].message);
            } else {
                levelScreenStartTime = new Date().getTime();
            }
        } else if (gameOver) {
            showMessage(ctx, "Game Over","30px Helvetica Neue");
        } else if(newLevel()) {
            showMessage(ctx, "No more levels: get a life");
        } else {
            // drawing the first circle
            cursorCircle.display();
            if(cursorCircle.isAllowToMove){
                cursorCircle.move();
            }
        
            //everything about the gears
            for(var i = 0; i < gears.length; i++){
                gears[i].display();
                gears[i].update();
                if(cursorCircle.isAllowToMove && !gameOver){
                    gameOver = gears[i].checkIntersection(cursorCircle);
                }
            }
        }
    }
    requestAnimationFrame(draw);
}



setup();

//utils this is the map function to remap size
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}