var Circle = function (ctx){
    this.ctx = ctx;
    this.color="rgba(255,255,255,1)";
    this.x;
    this.y;
    this.r;
    this.vx = 0;
    this.vy = 0;
    this.gravity  = 0.7;
    this.friction = 0.9;
    this.ctx.lineWidth = 10;
   }

Circle.prototype = {
    display:function (){
      this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "rgba(255,255,255,1)";
    
      this.ctx.beginPath();
      this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
      this.ctx.closePath();
      //this.ctx.fill();
        this.ctx.stroke();
    },

    move:function(){
        this.vy += this.gravity;
        this.vy *=this.friction;
        this.vx *=this.friction;
        this.x += this.vx;
        this.y += this.vy;
        
        if( this.y>window.innerHeight-this.r){this.y = window.innerHeight-this.r;this.vy*=-1;}
        if( this.y<0){this.y = this.r;this.vy*=-1;}
        if(this.x<this.r){
            this.x = this.r;
            this.vx*=-1;
        }
        if(this.x>window.innerWidth-this.r){
            this.x = window.innerWidth-this.r;
            this.vx*=-1;
        }
    },
    
    setVx:function(val){
        this.vx = val;
    }

}