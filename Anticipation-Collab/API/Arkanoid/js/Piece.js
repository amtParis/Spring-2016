var Piece = function(scope,expo){
  this.mesh;
  this.scope = scope;
  this.ID;
  this.removed = false;
  this.expo = expo;
  this.setup();
  this.images = [];
  this.allImages = [];
  this.limitCounter = 0;
  this.activeArtwork = [];
}

Piece.prototype = {

  setup:function(){
    var geometry = new THREE.CubeGeometry( 100, 100, 100);
    var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 10 } );
    this.mesh = new THREE.Mesh(geometry, material );
    this.mesh.name = this.ID;
    this.scope.scene.add(this.mesh);

    //load Contextual images for specific exhib ID
    var url = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token='+CooperToken+'&exhibition_id='+this.expo.id+'&page=1&per_page=100';
    new JSONLoader(url,this.list.bind(this));

  },

  list:function(file){
    var obj = JSON.parse(file);
    //console.log(obj);
    for(var i = 0;i<obj.objects.length;i++){
      for(var j= 0;j<obj.objects[i].images.length;j++){
        this.images.push(obj.objects[i].images[j]);
      }
    }
    //this.images = obj.images;
    //console.log("image number !!:",this.images.length);
    this.loadImages();

    //console.log(obj);
  },
  loadImages:function(){
    //console.log("loadImages");
    this.limitCounter++;
    var img = new Image();
    img.onload = (function(){

        var p = new Particle(img,this.mesh.position.x,this.mesh.position.z);
        this.allImages.push(p);
        //this.scope.scene.add(mesh);

      if(this.images.length == 0 || this.limitCounter == 10){
          this.scope.count();
      }else{
        this.loadImages();
      }
    }).bind(this);
    img.src = this.images[0].sq.url;
    this.images.shift();

  },

  add:function(){

    if(this.activeArtwork.length<10 && this.allImages[0]!=undefined){
      this.scope.scene.add(this.allImages[0].mesh);
      this.activeArtwork.push(this.allImages[0]);
      this.allImages.shift();
    }

  },

  update:function(ball){

    var dist = this.scope.getDistance(ball.position.x,ball.position.z,this.mesh.position.x,this.mesh.position.z);
    var angle = this.scope.getAngle(ball.position.x,ball.position.z,this.mesh.position.x,this.mesh.position.z);
    if(dist<ball.geometry.parameters.radius+50 && !this.removed){
      var selectedObject = this.scope.scene.getObjectByName(this.ID);
      console.log(selectedObject);
      this.scope.scene.remove( selectedObject );
      //this.mesh.dispose();
      //geometry.dispose();
      //material.dispose();
      //texture.dispose();
      this.mesh.position.y = -15000;
      this.scope.speedZ*=-1;
      this.scope.speedX = -Math.cos(angle)* this.scope.speedZ;
      this.removed = true;

      //SEND TWITTER MESSAGE
      if(this.scope.isTwitterActive) twitter.postTweet({status:'@'+new Date().valueOf()+' I Just enjoyed "'+this.expo.title + '". '+this.expo.url}, error, success);
    }

    if(this.removed){
      this.add();
      for(var i =0;i<this.activeArtwork.length;i++){
        this.activeArtwork[i].move();
      }
    }

  }

}
