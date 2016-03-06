var Circle = function (ctx){
    this.ctx = ctx;
    this.color = "rgba(255,255,255,1)";
    this.orbitColor ="rgba(255,255,255,0.4)";
    this.x;
    this.y;
    this.r;
    this.isGrowing = true;
    //
    this.radius;
    this.center;
    this.angle = 0;
    this.speed = 1;
    //
    this.viewOrbit = true;
}

Circle.prototype = {

    display:function (){
        
      //viewOrbit
        if(this.viewOrbit){
            this.ctx.strokeStyle = this.orbitColor;
            this.ctx.beginPath();
            this.ctx.arc(this.center.x,this.center.y,this.radius,0,Math.PI*2,true);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
      this.ctx.closePath();
      this.ctx.fill();
    },
    
    update:function(){
        if(this.isGrowing){
            this.r++;
        }else{
            this.angle+=this.speed;
            this.x = Math.cos(this.angle*Math.PI/180)*this.radius + this.center.x;
            this.y = Math.sin(this.angle*Math.PI/180)*this.radius + this.center.y;
        }
        
    },
    
    move:function(){
    }

}
