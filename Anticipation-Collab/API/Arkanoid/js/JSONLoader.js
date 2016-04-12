	/*
	JSONLoader
	Gael Hugo
	12.10.2015

*/

var JSONLoader = function(url,callback){
	this.url = url;
	this.xobj = new XMLHttpRequest();
	this.status;
	console.log("host",document.location.hostname);
	if (document.location.hostname == "localhost"){
		this.status = "200";
		console.log("localhost");
	}else if(document.location.hostname == "192.168.1.15"){ // tempo IP TB changed
		this.status = "200";
		console.log("localhost");
	}else{
		this.status = "0";
		console.log("local file");
	}
	this.callback = callback;
	this.send();
}

JSONLoader.prototype = {

	send:function(){
		this.xobj.overrideMimeType("application/json");
		this.xobj.open('GET',this.url,true);
		this.xobj.onreadystatechange = this.onchange.bind(this);
		this.xobj.send(null);
	},

	onchange:function(){
		if(this.xobj.readyState == 4 && this.xobj.status ==  this.status){
			this.callback(this.xobj.responseText);
		}
	}
}
