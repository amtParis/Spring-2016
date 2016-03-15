var MazeElement = function(ctx){
  this.x;
  this.y;
  this.side;
  this.ctx = ctx;
  this.color = 'white';
  this.speed;
  this.ID;
}

MazeElement.prototype = {

  display:function(){

    // this.ctx.fillStyle = this.color;
    // this.ctx.fillRect(this.x,this.y,this.side,this.side);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x,this.y);
    this.ctx.lineTo(this.x, this.y+ this.side);
    this.ctx.moveTo(this.x+this.side,this.y);
    this.ctx.lineTo(this.x+this.side, this.y+ this.side);
    this.ctx.closePath();
    this.ctx.stroke();



  },
  writeText:function(text){
      this.ctx.fillText(text,this.x,this.y);
  },
  move:function(){
    this.x+=this.speed;
    if(this.x<0 || this.x>window.innerWidth-this.side){
      this.speed*=-1;
    }
  }

}
