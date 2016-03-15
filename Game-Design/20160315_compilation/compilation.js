//
//SOUND EXAMPLE
var myStartingSound;

//IMAGE EXAMPLE
var backgroundTexture;

//Score
var score = 0;

//gameOver
var gameOver = false;

//introPage
var intro = true;



function setup(){

    // manual AUDIO SETUP
    myStartingSound= document.createElement('audio');
    myStartingSound.src = "data/loose.mp3";
    myStartingSound.preload = true;
    myStartingSound.loop = false;
    myStartingSound.load();
    document.body.appendChild(myStartingSound);

    //IMAGE
    backgroundTexture = new Image();
   backgroundTexture.src = 'data/background.jpg';

   setTimeout(function(){intro = false;},5000);
}

function draw(){
  //drawing background-image
  ctx.drawImage(backgroundTexture,0,0,w,h);

  //game over or INTRO change background-color
  ctx.fillStyle = (gameOver)?"rgba(255,0,0,1)":(intro)?"rgba(0,0,255,1)":"rgba(0,0,0,1)";

  //we want the intro to be an Image
  if(intro == true){
      ctx.drawImage(backgroundTexture,0,0,w,h);
  }else{
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0,0,w.h);
  }

  //activate SOUND
  if(...){
    myStartingSound.play();
  }

  //increase the score
  if(...){
    score++;
  }

  //check if we loose
  if(...){
    gameOver = true;
  }

  //draw the score on screen

  ctx.fillText(score,20,20);

}
