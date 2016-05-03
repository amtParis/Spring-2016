var App = function(){
  this.canvas       = document.getElementById("canvas");
  this.width        = window.innerWidth;
  this.height       = window.innerHeight;
  this.canvas.width = this.width;
  this.canvas.height= this.height;
  this.ctx          = this.canvas.getContext("2d");
  this.allFruits    = [];
  this.SHOW_PANEL   = true;
  this.PANEL        = null;
  this.ID           = 1;
  //
  this.fruits       = ["data/1.png","data/2.png","data/3.png","data/4.png","data/5.png"];
  this.CHANCE       = 1;
  this.time         = 5000; // 5 sec
  this.setup();
}

App.prototype = {

  setup:function(){
    this.loadIMG();
    document.addEventListener("keydown",this.onKeyDown.bind(this));
  },

  reload:function(){
    clearTimeout(this.PANEL.timeout);
    this.SHOW_PANEL   = true;
    this.CHANCE       = 1;
    this.PANEL.level  = -1;
    this.PANEL.nbr    = 0;
    this.PANEL.shifted= null;
    this.PANEL.updateLevel();
  },

  onKeyDown:function(e){
    if(!this.SHOW_PANEL){
      this.PANEL.shifted= null;
      var checker;
      switch(e.keyCode){
        case 65://a
          checker = this.PANEL.check(1);
        break;
        case 83://s
          checker = this.PANEL.check(2);
        break;
        case 68://d
          checker = this.PANEL.check(3);
        break;
        case 70://f
          checker = this.PANEL.check(4);
        break;
        case 71://g
          checker = this.PANEL.check(5);
        break;
      }
      console.log("chance",this.CHANCE);
      if(!checker && this.CHANCE>0){
        //when the player is wrong
        this.CHANCE--;
        // add your action

      }else if(!checker && this.CHANCE<=0){
        alert("YOU LOOSE. PLAY SOUND");
          // add your action

         this.reload();
      }else{

      }
    }
  },

  loadIMG:function(){
    var img = new Image();
    img.onload = (function(){
      this.allFruits.push({"id":this.ID++,"image":img});
      this.fruits.shift();
      if(this.fruits.length>0){
        this.loadIMG();
      }else{
        this.PANEL = new Sequence(this,this.allFruits);
        this.PANEL.updateLevel();
        this.draw();
      }
    }).bind(this);
    img.src = this.fruits[0];
  },

  nextLevel:function(){
      this.CHANCE = 1;
      this.PANEL.updateLevel();
      this.SHOW_PANEL = true;
      this.PANEL.shifted= null;
  },

  draw:function(){
    this.ctx.clearRect(0,0,this.width,this.height);

    //DESIGN BACKGROUND

    if(this.SHOW_PANEL){
      this.PANEL.display();
    }else{
      this.PANEL.displayShifted();
    }
    requestAnimationFrame(this.draw.bind(this));
  }

}
