var port = 1337;
var http = require('http');
var server = http.createServer(function(request,response){});
server.listen(port,function(){
	console.log("Port "+port+" is open");
});
var serverWebSocket = require('websocket').server;
var wsServer = new serverWebSocket({
	httpServer:server
});
var connection;
wsServer.on('request', function(request){
  connection = request.accept(null,request.origin);
});


var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var serialPort = new SerialPort("/dev/cu.usbmodem1411", {
  baudrate: 115200,
  parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function () {
console.log('Serial Port Open');
console.log('=================');
serialPort.on('data', function(data) {
  //console.log('Card UID: ',data.toString());
  var UID = data.toString().split("UID Value:");
  if(UID.length>1){
    console.log("UID:",UID[1]);
    connection.send(JSON.stringify({message:UID[1]}));
  }

  });
});
