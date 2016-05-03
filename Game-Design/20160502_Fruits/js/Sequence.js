var Sequence = function(scope,assets){
  this.scope  = scope;
  this.ctx    = this.scope.ctx;
  this.assets = assets;
  this.level  = -1;
  this.nbr    = 0;
  this.tmp;
  this.shifted = null;
  this.timeout;

  this.x = 0;
  this.y = 0;
  this.vx;
  this.vy;
  this.gravity = 0.07;
  //may be change
  this.durationForALevel = 3;
  this.factor = 2;
}

Sequence.prototype = {
  updateLevel:function(){
    this.tmp = [];
    this.level++;
    if(this.level%this.durationForALevel == 0){
      this.nbr+=this.factor;
    }
    for(var i = 0;i<this.nbr;i++){
      this.tmp.push(this.assets[Math.floor(Math.random()*this.assets.length)]);
    }
      this.timeout = setTimeout(this.removePanel.bind(this),this.scope.time);
  },

  removePanel:function(){
    this.scope.SHOW_PANEL = false;
  },

  check:function(id){
      if(id == this.tmp[0].id){
        console.log("good -> play SOUND");
        this.shifted = this.tmp.shift();
        this.vx = 2 - Math.random()*4;
        this.vy = -5 -Math.random()*6;
        this.x = window.innerWidth/2;
        this.y = window.innerHeight;
        return true;
      }else{
        console.log("no good -> play SOUND");
        return false;
      }
  },

  display:function(){
    var l = (window.innerWidth - (this.tmp.length * this.assets[0].image.width))/2;
    for(var i = 0;i<this.tmp.length;i++){
      this.ctx.drawImage(this.tmp[i].image,l+(i*200),0);
    }
  },

  move:function(){
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
  },

  displayShifted:function(){
    if(this.shifted != null){
      this.move();
      this.ctx.drawImage(this.shifted.image ,this.x,this.y);
    }
    if(this.x>window.innerWidth || this.x<0 || this.y>window.innerHeight || this.y<0){
      if(this.tmp.length<=0){
        this.shifted = null;
        clearTimeout(this.timeout);
        this.scope.nextLevel();
      }
    }
  }
}
