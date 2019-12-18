
// var name = prompt("What's your name mate?");
var sock = new WebSocket("ws://localhost:5001");
var log = document.getElementById('log');

sock.onopen = function(){
  sock.send(JSON.stringify({
    type: "name",
    data:  name
  }));
}

sock.onmessage = function(event){
  // Display received message from the server
  console.log(event);
  var json = JSON.parse(event.data);
  log.innerHTML += json.name + ":"+ json.data + "<br>";
}
sock.onerror = function(event) {
  console.log(event);
}
sock.onclose = function(event){
  console.log(event);
}

document.querySelector('button').onclick = function(){
  var text = document.getElementById('text').value;
  sock.send(JSON.stringify({
    type: "message",
    data: text
  }));
  document.getElementById('text').value = null;
  // Display input message from user
  log.innerHTML += "You: "+ text + "<br>";
};
