var Game = function(){
  console.log("test if everything is ok");
  this.canvas = document.getElementById("canvas");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx = this.canvas.getContext("2d");

  this.width =  window.innerWidth;
  this.height = window.innerHeight;
  this.setup();
}

Game.prototype = {

  setup:function(){

    //create all levels

    this.draw();
  },

  draw:function(){
    this.ctx.fillStyle = "rgba(0,0,255,1)";
    this.ctx.fillRect(0,0,this.width,this.height);

    requestAnimationFrame(this.draw.bind(this));
  }

}
