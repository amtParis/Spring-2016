var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d");

var width = window.innerWidth; // dimensions of our screen
var height = window.innerHeight; // dimensions of our screen 

canvas.width = width; 
canvas.height = height;

console.log("hello");

var myfirstCircle;

function addtion(a,b){
	var result = a +b;
	return result;
}

function setup(){
	myfirstCircle = new Circle(ctx); // calling object from circle.js 
	myfirstCircle.x = 200;
	myfirstCircle.y = 200;
	myfirstCircle.r = 50;

	draw();
}


function draw (){
	console.log("hello");

	 myfirstCircle.display();
	requestAnimationFrame(draw);

}

setup();
//addition(3,4);
