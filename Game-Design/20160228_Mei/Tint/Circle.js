var Circle = function(ctx,r){
    this.ctx = ctx;
    this.x;
    this.y;
    this.r = r;
    this.color;
    this.speed = 3;
    this.ID;
    this.rybColor;
    this.canChangeColor = true;
    this.original = r;
    this.big = r * 2;
    this.pos = {x:r};
    this.animation = new TWEEN.Tween(this.pos);
    this.backAnimation = new TWEEN.Tween(this.pos);
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
        this.y+=this.speed;
    },
    check:function(target){
        //Check the position of this element with the target
        if(this.getDistance(this.x,this.y,target.x,target.y)<= (target.r + this.r) &&  this.canChangeColor){
            this.canChangeColor = false;
            target.transformColor(this.rybColor);
        }
    },
    getDistance:function(x1,y1,x2,y2){
        return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    },
    transformColor:function(color){
        //convert color
        this.rybColor = rybColorMixer.mix(this.rybColor,color,{ result: "ryb", hex: false });
        this.ryb(this.rybColor);
        
        //ANIMATION WHEN A COLOR IS TOUCHED
        this.animation.to({x:this.big},10)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate((function(){this.r = this.pos.x;}).bind(this));
        this.backAnimation.to({x:this.original},1000)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate((function(){this.r = this.pos.x;}).bind(this));
        this.animation.chain(this.backAnimation);
        this.animation.start();
    },
    ryb:function(color){
        this.rybColor = color;
        var col     = ryb2rgb(color);
        // ACTIVE COLOR IN RGB
        this.color  = "rgba("+col[0]+","+col[1]+","+col[2]+",1)";
    }
}