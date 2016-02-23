var Target = function(ctx){
    this.x;
    this.y;
    this.r;
    this.ctx = ctx;
    this.color = "rgba(255,255,255,1)";
}

Target.prototype = {
    update:function(){
        this.r+=3;
    },
    display:function(){
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}