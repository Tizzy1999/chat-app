var server = require('ws').Server;
var s = new server({port: 5001});
// s contains a list of client connetced
s.on('connection',function(ws){
  // ws refers to a particular client
  ws.on('message',function(message){
    console.log('Server Received: '+message);
    message = JSON.parse(message);


    if(message.type == "name"){
      // name is sent only once when the connection is open
      ws.personName = message.data;
      return;
    }

    // s.clients.forEach(function e(client){
    //   // if it's not the client herself, broadcast the message to everyone
    //   if(client != ws){
    //     client.send(JSON.stringify({
    //       // Send your name to others except yourself
    //       name: ws.personName,
    //       data: message.data
    //     }));
    //   }
    // });
    ws.send(JSON.stringify(message));
  });

  ws.on('close',function(){
    console.log("I lost a client");
  })

  console.log("one more client connected");
});
