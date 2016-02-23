var App = function(){
  this.soundCloudTrack;

  this.camera;
	this.scene;
	this.renderer;
	this.controls;
  this.ball;
  this.bar;
  this.allPieces = [];

  //ball
  this.speedZ = -10;
  this.speedX = 0;

  //bar
  this.moveLeft = false;
  this.moveRight = false;

  this.gameIsOn = false;

  //COOPER var
  this.expo;

  this.globalCounter = 0;
  this.isTwitterActive = true;

  this.setup();
}

App.prototype = {

  //set AMBIENCE SOUNDTRACK FROM SOUNDCLOUD
  setTrack:function(track){
    var oembedElement = document.getElementById('oembed');
    this.soundCloudTrack = track;
    SC.oEmbed(this.soundCloudTrack, { auto_play: true }).then(function(oEmbed) {
      console.log('oEmbed response: ', oEmbed);
      oembedElement.innerHTML = oEmbed.html;
    });
  },

  setup:function(){
    this.camera             = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z  = 1300 ;
    this.camera.position.y  = 750 ;

    this.scene              = new THREE.Scene();
    this.renderer           = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.domElement.style.position = 'absolute';
    document.body.appendChild( this.renderer.domElement );
    this.controls             = new THREE.OrbitControls(this.camera);
    this.controls.maxDistance = 25000;
    this.controls.minDistance = 1;
    this.controls.zoomSpeed   = 0.2;

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.scene.add( light );
   var spotLight = new THREE.SpotLight( 0xcccccc);
   spotLight.position.set( 1000, 1000, 1000 );
   this.scene.add(spotLight);

    var geometry = new THREE.SphereGeometry( 50, 100,100 );
    var material = new THREE.MeshPhongMaterial( { color: 0xff33ff,
					emissive: 0x050505,
					side: THREE.DoubleSide,
					shading: THREE.FlatShading } );
    this.ball= new THREE.Mesh(geometry, material );
    this.ball.position.z = 500;
    this.scene.add( this.ball );


    var geometry = new THREE.CubeGeometry( 200, 50,5 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff,
					emissive: 0xcccccc,
					side: THREE.DoubleSide,
					shading: THREE.FlatShading } );
    this.bar = new THREE.Mesh(geometry, material );
    this.bar.position.z = 555;
    this.scene.add( this.bar );

    //  SET FROM COOPER HEWITT
    //  GET ALL EXHIBIT
    //  JSON LOAD
    var url = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getList&access_token=' + CooperToken + '&page=1&per_page=500';
    new JSONLoader(url,this.list.bind(this));

    //this.createPieces(10,5);
    ////////// INTERACTION
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    window.addEventListener( 'keydown', this.onKeyDown.bind(this), false );
    window.addEventListener( 'keyup', this.onKeyUp.bind(this), false );


  },

  list:function(file){
    this.expo = JSON.parse(file);
    var cols = 10;
    var lines = Math.ceil(this.expo.exhibitions.length/cols);
    this.createPieces(cols,lines);
    this.draw();
    console.log(this.expo);
  },

  createPieces:function(cols,lines){
      var w = 0;
      for(var j = 0 ;j<lines;j++ ){
        for(var i=0;i<cols;i++){
        //  var geometry = new THREE.CubeGeometry( 100, 100, 100);
        //  var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 10 } );
        //  var mesh = new THREE.Mesh(geometry, material );
          if(this.expo.exhibitions[w]!=undefined){
            var piece = new Piece(this,this.expo.exhibitions[w]);
            piece.ID = "piece_"+w;
            piece.mesh.position.x = i*110 - 500;
            piece.mesh.position.z = j*110- 550;
            this.allPieces.push(piece);
            w++;
          }else{
            break;
          }
        }
      }
  },

  onWindowResize:function() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  },
  onKeyDown:function(key){
    key.preventDefault();
    console.log(key);
    switch(key.keyCode){
      case 13:
        this.gameIsOn = !this.gameIsOn;
      break;
      //left
      case 65:
        this.moveLeft = true;
      break;
      //right
      case 68:
        this.moveRight = true;
      break;
      //t
      case 84:
          this.isTwitterActive = !this.isTwitterActive;
      break;
    }
  },
  onKeyUp:function(key){
      switch(key.keyCode){
        case 65:
          this.moveLeft = false;
        break;
        //right
        case 68:
          this.moveRight = false;
        break;
      }
  },

  draw:function(){
    TWEEN.update();
    this.controls.update();
    this.render();
    if(this.gameIsOn) this.globalAnimation();
    if(this.moveLeft) this.bar.position.x-=30;
    if(this.moveRight) this.bar.position.x+=30;

    requestAnimationFrame(this.draw.bind(this));
  },

  render:function(){
    this.renderer.render( this.scene, this.camera );
  },

  globalAnimation:function(){
      this.ball.position.z+=this.speedZ;
      this.ball.position.x+=this.speedX;

      for(var i = 0;i<this.allPieces.length;i++){
          this.allPieces[i].update(this.ball);
      }

      if(this.ball.position.z>=this.bar.position.z-5-this.ball.geometry.parameters.radius && this.ball.position.x>=this.bar.position.x-100 && this.ball.position.x<=this.bar.position.x+100){
        this.ball.position.z = this.bar.position.z-5-this.ball.geometry.parameters.radius+1;
        this.speedZ*=-1;
      }

      if(this.ball.position.x<= -500 || this.ball.position.x>=500){
          this.speedX*=-1;
      }
  },
  getDistance:function(x1,y1,x2,y2){
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
  },
  getAngle:function(x1,y1,x2,y2){
    return Math.atan2(y2 - y1, x2 - x1);
  },
  count:function(){
    this.globalCounter++;
    console.log(this.globalCounter);
  }

}
