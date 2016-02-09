var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.getElementById('canvas');
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext('2d');

function setup(){

  draw();
}

//loop function
function draw(){

  //call the loop
  requestAnimationFrame(draw);
}

//App launcher
setup();
