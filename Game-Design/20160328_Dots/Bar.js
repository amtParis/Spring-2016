var Bar = function(ctx) {
    this.ctx = ctx;
    this.height = 10;
    this.width = 70;
    this.x;
    this.y = window.innerHeight - this.height;
    this.alpha = 0.9 + Math.random();
//    this.color = "rgba(255,0,0,"+this.alpha+")";
    this.color = "red";
}

Bar.prototype = {
    display:function(){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.fillRect(this.x, this.y,  this.width , this.height);
        this.ctx.closePath();
    },
    
    update:function(val){
    this.x = val;
    }
}