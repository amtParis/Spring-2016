var Grid = function(ctx,w,h,size){
    this.ctx = ctx;
    this.color = "rgba(255,0,0,0.5)";
    this.s;
    this.w;
    this.h = h;
    this.setGrid(w,h,size);
}

Grid.prototype = {
    show:function(){
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        for(var i = 0;i<this.w;i++){
            this.ctx.moveTo(i*this.s,0);
            this.ctx.lineTo(i*this.s,this.h);
        }
        this.ctx.stroke();
        this.ctx.closePath();
    },
    setGrid:function(w,h,s){
        this.w = Math.floor(w/s);
        this.s = w/this.w;
    }
}