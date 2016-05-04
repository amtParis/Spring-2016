//LIST ALL FUNCTION FOR ALL CARDS
var allCards = [];
allCards["  9E 10 A4 00"] =	function(){$('body').css({'background-color':'tomato'});}
allCards["  2F 9C 92 00"] = function(){$('body').css({'background-color':'skyblue'});}



var connection = new WebSocket('ws://localhost:1337');
  connection.onopen = function(){
  console.log("open connection");
}
connection.onmessage = function(message){
  try {
       var json = JSON.parse(message.data);
   } catch (e) {
       alert("BAD JSON");
 return;
   }
   var cardID = json.message.replace(/(\r\n|\n|\r)/gm,"");
   if(allCards[cardID]!=undefined){
     allCards[cardID]();
   }
}
connection.onerror = function(error){
  alert("PROBLEM WITH SERVER");
}
