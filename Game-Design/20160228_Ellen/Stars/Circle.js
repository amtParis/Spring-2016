var Circle = function (ctx){
    this.ctx = ctx;
    this.colors = ["rgba(255,255,255,1)","rgba(255,255,255,0.1)"]; // we use 2 colors for the shiny effect
    this.x;
    this.y;
    this.r;
    this.origin;
    this.a = 0;// angle for small orbit rotation
    this.orbit = Math.random()*15; // random orbit radius
    this.orbitSpeed = Math.random(); // random orbit speed
    this.ID;
    this.isTouched = false;
    this.shapeMotion = false;
    this.identifier;
    this.speedUp = 1;
}

Circle.prototype = {
    
    position:function(x,y){
        this.origin = {x:x,y:y};
        this.x = x;
        this.y = y;
    },

    display:function (){
      this.ctx.fillStyle = this.colors[Math.floor(Math.random()*this.colors.length)];//this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
      this.ctx.closePath();
      this.ctx.fill();
    },

    move:function(){
        if(this.shapeMotion){
            this.origin.y-= this.speedUp;
        }
        this.x = Math.cos(this.a*Math.PI/180) * this.orbit + this.origin.x;
        this.y = Math.sin(this.a*Math.PI/180) * this.orbit + this.origin.y;
        this.a+= this.orbitSpeed;
    }

}