var Ghost = function(ctx){
  this.ctx = ctx;
  this.x = window.innerWidth - 512;
  this.y = window.innerHeight/2-256;
  this.img = new Image();
  this.img.src = "data/ghost.png";

  this.step = 1;
  this.radius = 50;
  this.mouthX = this.x+256;
  this.mouthY = this.y+256+60;
  this.color = "rgba(0,0,0,1)";

}

Ghost.prototype = {

  move:function(val){
    this.y = val;
    this.mouthY = this.y+256+60;
  },

  display:function(){
    this.ctx.drawImage(this.img,this.x,this.y);
  },

  displayMouth:function(){
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    for(var i = 0;i<360;i+=this.step){
      var _x = this.mouthX + Math.cos((i-90)*Math.PI/180)*this.radius;
      var _y = this.mouthY + Math.sin((i-90)*Math.PI/180)*this.radius;
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
