window.onload = function(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var width = window.innerWidth;
  var height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  var radius1 = 5;
  var radius2 = 150;
  var radius3 = 250;
  var angle = 0;

  (function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);

    // save state and adjust coordinate space
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);

    context.lineWidth = 1; // outer circle

    context.beginPath();
    context.arc(0, 0, 2, 0, 2 * Math.PI, true); 
    context.fill()


    ++angle;
    var rads = angle * Math.PI / 180;
    var x = Math.cos(rads);
    var y = Math.sin(rads);

    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(radius1 * x, radius1 * y);
    context.lineTo(radius2 * x, radius2 * y);
    context.stroke();


    // restore transformations for next pass
    context.restore();

    window.requestAnimationFrame(animate)
  }())

}
