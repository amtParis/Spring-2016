// JavaScript Document
var Circle = function(ctx){
    this.x;
    this.y;
    this.r;
    this.ctx = ctx;
    this.color = 'white';
    this.isAllowToMove = false;
    this.speed = 0;
    this.isAllowToCross = false;
    this.mazeID = 0;
    this.isTouched = false;
}

Circle.prototype = {
  display:function(){
          this.ctx.beginPath();
          this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
          this.ctx.fillStyle = this.color;
          this.ctx.fill();
      },
  move:function(){

  },
  update:function(elements,speed){
    for(var i = 0;i<elements.length;i++){
      //check if I'm inside a element
      if(this.y>=elements[i].y && this.y<=elements[i].y+elements[i].side){
        //MOVE INSIDE THE ZONE
        if(isMoving ){
          if(this.y<=elements[i].y){
            this.y = elements[i].y+2;
          }else if(this.y>=elements[i].y+elements[i].side){
            this.y = elements[i].y+elements[i].side-2;
          }else{
            this.y+=speed;
          }
        }
        //CHECK IF WE ARE OUTSIDE THE ZONE
        if(this.mazeID != elements[i].ID){
          var diff = (speed>0)?Math.abs(elements[i].x - elements[i+1].x):Math.abs(elements[i].x - elements[i-1].x);
          //debug
          //elements[i].writeText(diff);
          if( (diff<elements[i].side/2) ){
            this.mazeID = elements[i].ID;
            this.y = (speed>0)?elements[i].y+2:elements[i].y + elements[i].side-2;
          }else{
            this.y = (speed>0)?elements[i].y-2:elements[i-1].y+2;
          }
        }
        //MOVE ACCORDINGLY
        if(this.mazeID == elements[i].ID){
          this.x = elements[i].x+elements[i].side/2;
        }
      }
    }//for

    if(this.y<=-this.r && !this.isTouched ){
      console.log("YOU WIN !");
      score++;
      this.isTouched = true;
      setTimeout(initGame,3000);
    }
  },

  check:function(obstacles){
    for(var i = 0;i<obstacles.length;i++){
      if(getDistance(this.x,this.y,obstacles[i].x,obstacles[i].y)<= this.r + obstacles[i].r && !this.isTouched){
          //reload the game
          this.color = 'red';
            this.isTouched = true;
          setTimeout(initGame, 3000);
      }
    }
  }

}
