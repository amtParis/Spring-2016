// JavaScript Document
var Circle = function(ctx){
    this.x;
    this.y;
    this.radius;
    this.ctx = ctx;
    this.color = 'white';
    this.offsetX = 0;
    this.offsetY = 0;
    this.ID;
    
    //FOR INTERACTION
    this.dragging = false;
    //INERTIA
    this.newY = 0;
    this.newX = 0;
    this.oldY = 0;
    this.oldX = 0;
    this.ySpeed = 0;
    this.xSpeed = 0;
    this.friction = 0.99 - Math.random()*0.04;
    
    this.ctx.lineWidth = 5;
    this.isTouched = false;
}


Circle.prototype = {
    
    draw:function(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 *Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    },
    drawStroke:function(){
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 *Math.PI, false);
        this.ctx.closePath();
        this.ctx.stroke();
    },
    
    stopDragging:function(){
        this.dragging = false;
        this.ID = 0;
    },
        
    drag:function(mx,my){
        if(this.dragging){
            this.x = mx + this.offsetX;
            this.y = my + this.offsetY;
        }
    },
    clicked:function(mx,my){
        this.offsetX = this.x-mx;
        this.offsetY = this.y-my;
        if(Math.sqrt(Math.pow(this.offsetX,2)+Math.pow(this.offsetY,2))<this.radius){
            this.dragging = true;
            
        }else{
            this.dragging = false;
        }
    },
    multiDrag:function(mouses){
        if(!this.dragging){
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.xSpeed *= this.friction;
            this.ySpeed *= this.friction;
            
            //BOUNCE
            if(this.x<this.radius){this.x = this.radius;this.xSpeed*=-1;}
            if(this.x>window.innerWidth-this.radius){this.x = window.innerWidth-this.radius;this.xSpeed*=-1;}
            if(this.y<this.radius ){this.y = this.radius;this.ySpeed*=-1;}
            if(this.y>window.innerHeight-this.radius){this.y = window.innerHeight-this.radius;this.ySpeed*=-1;}
            
        }else{
            //SI ON DRAG, IL FAUT FAIRE SUIVRE LE DOIGT PAR LA BALLE
            for(var j=0;j<mouses.length;j++){
                if(this.dragging && mouses[j].ID == this.ID){
                    this.x = mouses[j].mouseX + this.offsetX;
                    this.y = mouses[j].mouseY + this.offsetY;
                }
            }
        }
    },
        
    multiClicked:function(mouses){
        for(var k=0;k<mouses.length;k++){
            this.offsetX = this.x-mouses[k].mouseX;
            this.offsetY = this.y-mouses[k].mouseY;
            if(Math.sqrt(Math.pow(this.offsetX,2) + Math.pow(this.offsetY,2)) < this.radius){
                this.dragging = true;
                this.ID = mouses[k].ID;
                break;
            }else{
                this.dragging = false;
            }
        }
    },
        
    calculateSpeedValue:function(mx,my){
        this.newY = my;
        this.ySpeed = this.newY - this.oldY;
        this.oldY = this.newY;
        
        this.newX = mx;
        this.xSpeed = this.newX - this.oldX;
        this.oldX = this.newX;
    },
    
    check:function(targets){
        for(var i = 0;i<targets.length;i++){
            if(this.xSpeed<=0.5 && getDistance(this.x,this.y,targets[i].x,targets[i].y)<=targets[i].radius && !this.dragging && this.color == targets[i].color){
                targets[i].isTouched = true;
                this.isTouched = true;
            }
        }
    }
    
}