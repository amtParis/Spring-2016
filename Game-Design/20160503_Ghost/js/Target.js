var Target = function(ctx){
  this.x = 0;
  this.y = 0;
  this.ctx = ctx;
  this.step = 1;
  this.radius = 50;
  this.color = "rgba(0,0,0,1)";

  this.speed =1;
}

Target.prototype = {
  move:function(){
    this.x+=this.speed;
  },

  display:function(){
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      for(var i = 0;i<360;i+=this.step){
        var _x = this.x + Math.cos((i-90)*Math.PI/180)*this.radius;
        var _y = this.y + Math.sin((i-90)*Math.PI/180)*this.radius;
        if(i==0){
          this.ctx.moveTo(_x,_y);
        }else{
          this.ctx.lineTo(_x,_y);
        }
      }
      this.ctx.closePath();
      this.ctx.fill();
  }
}
