var Rectangle = function (ctx){
    this.ctx = ctx;
    this.color = "rgba(255,0,0,1)";
    ctx.rect(20,20,150,100);
    ctx.stroke();
  
}

var path = new Path.Rectangle(new Point(80, 25), new Size(50, 50));
path.fillColor = 'black';

// Rotate the path by 30 degrees:
path.rotate(30);