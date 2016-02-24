var Particle = function (img,x,z){
  this.x = x;
  this.z = z;
  this.y = 0;
  this.vx = 2 - Math.random()*4;
  this.vy = 5 + Math.random()*6;
  this.gravity = 0.02;

  //create the image particle system
  var geometry = new THREE.CubeGeometry( 60, 60, 60);
  //var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 10 } );
  var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture(img.src) } );
  this.mesh = new THREE.Mesh(geometry, material );
}

Particle.prototype={

  move:function(){

      this.vy -= this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.mesh.position.y = this.y;
      this.mesh.position.z = this.z;
      this.mesh.position.x = this.x;

    //  if(this.x>window.innerWidth || this.x<0 || this.y>window.innerHeight || this.y<0){this.init();}
    if(  this.y<=-2000){
         this.y = 3000;
         this.vy = 0;
    }
    if(this.mesh.position.x<=-500 ||  this.mesh.position.x>=500){
      this.vx*=-1;
    }

  },
  init:function(){
      this.vx = 2 - Math.random()*4;
      this.vy = 5 +Math.random()*6;
  }
}
