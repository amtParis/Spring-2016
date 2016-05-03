var Circle = function(ctx){
    this.ctx = ctx;
    this.x;
    this.y;
    this.color;
    this.vx;
    this.vy;
    this.gravity = 0.07;
    this.ID;
}

Circle.prototype = {

    display:function(){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        this.ctx.closePath();
        this.ctx.fill();
    },
    move:function(){

        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

      //  if(this.x>window.innerWidth || this.x<0 || this.y>window.innerHeight || this.y<0){this.init();}

    }
}
