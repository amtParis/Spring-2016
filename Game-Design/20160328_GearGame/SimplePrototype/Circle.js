var Circle = function (ctx){
    this.ctx = ctx;
    this.color = "rgba(255,255,255,1)";
    this.x;
    this.y;
    this.r;

    this.isAllowToMove = true;
    this.speed = 1.5;
}

Circle.prototype = {

    display:function (){
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
      this.ctx.closePath();
      this.ctx.fill();
    },

    move:function(){
      if(this.y<-this.r){
        this.y = window.innerHeight+50;
      }
        this.y-=this.speed;
    }

}