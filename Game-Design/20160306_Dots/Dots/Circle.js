// JavaScript Document
var Circle = function(x,y,radius,ctx){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.color = 'white';
    this.centerX = window.innerWidth/2;
    this.centerY = window.innerHeight/2;
    this.movementRadius;
    this.angle;
    this.difference;
    this.ID;
    this.isMoving = false;
    
   // this.init();
}


Circle.prototype = {
    
draw:function(){
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 *Math.PI, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
},
    
move:function(angle){
    this.x = this.centerX + Math.cos((angle+this.difference)*Math.PI/180)*this.movementRadius;
    this.y = this.centerY + Math.sin((angle+this.difference)*Math.PI/180)*this.movementRadius;
},
    
init:function(){
    this.x = this.centerX + Math.cos((this.difference)*Math.PI/180)*this.movementRadius;
    this.y = this.centerY + Math.sin((this.difference)*Math.PI/180)*this.movementRadius;
},
    
update:function(){
    this.movementRadius-=4;
    this.x = Math.cos(this.angle)*this.movementRadius + this.centerX;
    this.y = Math.sin(this.angle)*this.movementRadius + this.centerY;
},
check:function(dots){
    for(var i=0;i<dots.length;i++){
        if(getDistance(this.x,this.y,dots[i].x,dots[i].y)<= (this.radius + dots[i].radius) && this.color == dots[i].color){
            // YOU WON !!
            console.log("you won");
            allTargets.push(displayedTarget[this.ID]);
            delete displayedTarget[this.ID];

        }else if(getDistance(this.x,this.y,dots[i].x,dots[i].y)<= (this.radius + dots[i].radius) && this.color != dots[i].color){
            // YOU LOOSE
            console.log("you loose");
            allTargets.push(displayedTarget[this.ID]);
            delete displayedTarget[this.ID];
        }
    }
}
    
}