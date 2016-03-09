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
           // target.transformColor(this.rybColor);
            // console.log(target.color,this.color);
            var originalTargetColor = target.color;
            //red
            if(this.color=="red"&&target.color=="red"){target.color="red"}
            if(this.color=="white"&&target.color=="red"){target.color="white"}
            if(this.color=="gold"&&target.color=="red"){target.color="orange"}
            if(this.color=="steelblue"&&target.color=="red"){target.color="mediumpurple"}
            if(this.color=="black"&&target.color=="red"){target.color="black"}
            //blue
            if(this.color=="black"&&target.color=="steelblue"){target.color="black"}
            if(this.color=="steelblue"&&target.color=="steelblue"){target.color="steelblue"}
            if(this.color=="gold"&&target.color=="steelblue"){target.color="green"}
            if(this.color=="steelblue"&&target.color=="steelblue"){target.color="steelblue"}
            if(this.color=="red"&&target.color=="steelblue"){target.color="mediumpurple"}
            //yellow
            if(this.color=="black"&&target.color=="gold"){target.color="black"}
            if(this.color=="white"&&target.color=="gold"){target.color="white"}
            if(this.color=="gold"&&target.color=="gold"){target.color="gold"}
            if(this.color=="steelblue"&&target.color=="gold"){target.color="green"}
            if(this.color=="red"&&target.color=="gold"){target.color="orange"}
            //white
            if(this.color=="black"&&target.color=="white"){target.color="black"}
            if(this.color=="white"&&target.color=="white"){target.color="white"}
            if(this.color=="gold"&&target.color=="white"){target.color="gold";}
            if(this.color=="steelblue"&&target.color=="white"){target.color="steelblue";}
            if(this.color=="red"&&target.color=="white"){target.color="red";}
            //black
            if(this.color=="red"&&target.color=="black"){target.color="black"}
            if(this.color=="steelblue"&&target.color=="black"){target.color="black"}
            if(this.color=="black"&&target.color=="black"){target.color="black"}
            if(this.color=="white"&&target.color=="black"){target.color="black"}
            if(this.color=="steelblue"&&target.color=="black"){target.color="black"}
            //------
            
            
            if(originalTargetColor == target.color){
                //orange
                if(this.color=="gold"&&target.color=="orange"){target.color="black"}
                if(this.color=="red"&&target.color=="orange"){target.color="black"}
                if(this.color=="steelblue"&&target.color=="orange"){target.color="black"}
                if(this.color=="black"&&target.color=="orange"){target.color="black"}
                if(this.color=="white"&&target.color=="orange"){target.color="white"}
                //green
                if(this.color=="gold"&&target.color=="green"){target.color="black"}
                if(this.color=="red"&&target.color=="green"){target.color="black"}
                if(this.color=="steelblue"&&target.color=="green"){target.color="black"}
                if(this.color=="black"&&target.color=="green"){target.color="black"}
                if(this.color=="white"&&target.color=="green"){target.color="white"}
                //mediumpurple
                if(this.color=="gold"&&target.color=="mediumpurple"){target.color="black"}
                if(this.color=="red"&&target.color=="mediumpurple"){target.color="black"}
                if(this.color=="steelblue"&&target.color=="mediumpurple"){target.color="black"}
                if(this.color=="black"&&target.color=="mediumpurple"){target.color="black"}
                if(this.color=="white"&&target.color=="mediumpurple"){target.color="white"}
            }
            
           // console.log(target.color);
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