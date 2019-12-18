# Client-Sever
---
## Client:
Request:
>request + request headers
## Server:
response:
>response + response headers( content-type + status )
# How we route requests to nodejs
---
## Protocols
- A set of communication rules, that two sides agree to use when communicating
- A set of rules that two sides can both understand

## Socket
- A channel where information can be sent
- We use different protocols(HTTP, FTP, Web Socket) to strcuture data or information that's been sent
- And the data is been sent using TCP protocol, which split the data into smaller little sections called packets, and transfer them along socket

## Ports
- A program running on a computer can listen for requests sent to a particular port number (server)
- If a request is sent to an IP address to a particular port number on that IP. If nodejs is listening on requests on that port, it will respond.

# Set up a server on Node js
---
* In nodejs, server also inherits from event emitter. Thus, you can register the server with a listener.


```javaScript
var http = require('http');
// essentially, the call-back function of the listener
var server = http.createServer(function(req, res){
  // define response status and response content-type
  console.log("request was made: "+ req.url);// access the url of the request
  res.writeHead(200, {'Content-Type': 'text/plain'});
  // response body
  res.end('Hey Tizzy');
});
// define server port and IP address
server.listen(3000, '127.0.0.1');
console.log("I'm listening to port 3000");

```
## Buffer - Stream
- Temporary storage spot for a chunk of data that's being transfered from one place to another
- The buffer is filled with data, then passed along
- Transfer small chunks of data at a time
- We can create streams in Node.js to transfer data, which helps us increase performance

```javaScript
var fs = require('fs');
// read data stream from a file
var myReadStream = fs.createReadStream(__dirname + '/data_stream.txt','utf8');
var cnt=1;
myReadStream.on('data', (chunk)=>{
  console.log('new chunk '+(cnt++)+' received:');
  console.log(chunk);
});
```

```javaScript
var fs = require('fs');
var myReadStream = fs.createReadStream(__dirname+'/data_stream.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname+'/write_stream2.txt');

myReadStream.on('data', (chunk)=>{
  console.log('new chunk received');
  myWriteStream.write(chunk);
});

```

## Pipes
* take data from a read stream and then pipe it to a write stream
* instead of manually listening for data event when we receive a chunk of data, the pipe takes care of the whole process for us
* you can only use pipe in read stream

```javaScript
var fs = require('fs');
var myReadStream = fs.createReadStream(__dirname + '/readMe.txt','utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

myReadStream.pipe(myWriteStream);
```

## Server -> Client
#### Example 1: Sending txt File
```javaScript
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type':'text/plain'});
  var myReadStream = fs.createReadStream(__dirname + '/data_stream.txt', 'utf8');
  myReadStream.pipe(res);
});

server.listen(3000, '127.0.0.1');

```
#### Example 2: Sending html File
```javaScript
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type':'text/html'});
  var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  myReadStream.pipe(res);
});
```
#### Example 3: Serving JSON Data
```javaScript
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
  console.log('request was made: '+req.url);
  res.writeHead(200, {'Content-Type':'application/json'});
  var myObj = {
    name: 'Tizzy',
    job: 'Student',
    age: 20
  };
  // Let's assume that the front-end javaScript requests
  // some data from server. In this case, the server can send JSON
  // data back to the front-end application.
  res.end(JSON.stringify(myObj));
});

server.listen(3000, '127.0.0.1');
console.log('Listening to port 3000');

```

## Basic Routing
routing to different html pages based on url
```javaScript
var server = http.createServer(function(req, res){
  console.log('request was made: '+req.url);
  if(req.url ==='/home' || req.url === '/'){
    res.writeHead(200, {'Content-Type':'text/html'});
    fs.createReadStream(__dirname+'/index.html').pipe(res);
  }else if(req.url === '/contact'){
    res.writeHead(200, {'Content-Type':'text/html'});
    fs.createReadStream(__dirname+'/contact.html').pipe(res);
  }else if(req.url === '/api/tizzy'){
    var tizzy = [{name: 'tizzy', age:20}, {name:'merry', age:21}];
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(tizzy));
  }else{
    res.writeHead(404, {'Content-Type':'text/html'});
    fs.createReadStream(__dirname+'/404.html').pipe(res);
  }
});
```
## NPM: node package manager
use npm to help us install third-party packages or modules
- express package: help us with routing and templating, routing packages
- package.json: keeps track of our dependencies, which are packages we need to run the application
