var App = function(){
  this.canvas       = document.getElementById("canvas");
  this.width        = window.innerWidth;
  this.height       = window.innerHeight;
  this.canvas.width = this.width;
  this.canvas.height= this.height;
  this.ctx          = this.canvas.getContext("2d");

  this.allTargets = [];
  this.counter = 0;
  this.limit = 100;

  this.ghost;

  this.setup();
}

App.prototype = {

  midiControl:function(val){
    console.log(val[3]);
      switch(val[3]){
        case 0:
          //action trigger value based on val[4]
            this.updateRadius(val[4].map(0,127,5,200));
        break;
        case 1:
          //action trigger value based on val[4]
          this.ghost.move(val[4].map(0,127,0,this.height-512));
        break;
        case 2:
          //action trigger value based on val[4]
          this.ghost.radius = val[4].map(0,127,5,100);
        break;
        case 16:
          //action trigger value based on val[4]
        //  this.updateShape(val[4].map(0,127,3,360));
        break;
        case 17:
            this.ghost.step = val[4].map(0,127,3,360);
        break;
      }
  },

  setup:function(){
    // var t = new Target(this.ctx);
    // t.x = 0
    // t.y = window.innerHeight/2;
    // t.radius = 5;
    // t.step = 1;
    // this.allTargets.push(t);
    this.ghost = new Ghost(this.ctx);

    this.draw();
  },

  // FOR EXAMPLE
  updateShape:function(val){
    for(var i = 0;i<this.allTargets.length;i++){
      this.allTargets[i].step = val;
    }
  },
  updateRadius:function(val){
    for(var i = 0;i<this.allTargets.length;i++){
      this.allTargets[i].radius = val;
    }
  },

  createRandomTarget:function(){
    var t = new Target(this.ctx);
    t.radius = 5 + Math.round(Math.random()*95);
    t.x = -t.radius;
    t.y =t.radius + Math.random()*(window.innerHeight-(t.radius*2))//window.innerHeight/2;
    t.color = "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+",1)";
    t.step = 3+Math.floor(Math.random()*357);
    this.allTargets.push(t);
  },

  draw:function(){
    this.ctx.clearRect(0,0,this.width,this.height);

    //draw the ghost
    this.ghost.display();
    this.ghost.displayMouth();

    //draw all targets
    for(var i = 0;i<this.allTargets.length;i++){
      this.allTargets[i].move();
      this.allTargets[i].display();
    }

    if(this.counter%this.limit == 0){
      //create new random targets
      this.createRandomTarget();
      this.counter = 0;
    }
      this.counter++;
      console.log(this.counter);


    requestAnimationFrame(this.draw.bind(this));
  }

}
