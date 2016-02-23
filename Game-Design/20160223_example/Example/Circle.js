var Circle = function(ctx){
    this.ctx = ctx;
    this.x;
    this.y;
    this.color;
    this.vx;
    this.vy;
    this.gravity = 0.07;
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
        
        if(this.x>window.innerWidth || this.x<0 || this.y>window.innerHeight || this.y<0){this.init();}
        
    },
    init:function(){
        this.x = window.innerWidth/2;
        this.y = window.innerHeight;
        this.vx = 2 - Math.random()*4;
        this.vy = -5 -Math.random()*6;
        this.r = Math.random()*5+1
        this.color = "rgba("+(parseInt(Math.random()*255)+100)+","+parseInt(Math.random()*0)+","+parseInt(Math.random()*0)+",1";
    }
}