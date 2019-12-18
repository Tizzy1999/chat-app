## Node.js
* Node.js is a C++ application
* At the heart of Node.js is the V8 engine
* The V8 engine converts JS into machine code
* Enable us to create server-side code in javaScript

## global object
* can be used directly anywhere within our application

```javaScript

var time = 0;

var timer = setInterval(function(){
  time += 3;
  console.log(time + ' seconds have passed');
  if(time > 7){
    clearInterval(timer);
  }
}, 3000);
```

```javaScript
// the directory I'm in
console.log(__dirname);

```

## function expression (anonymous function)
```javaScript
var sayBye = function(){
  console.log('bye');
}

```

## Module
* essentially another javaScript file
* how different javaScript files share the function

```javaScript
// -----------count.js------------
var counter = function(arr){
  return 'There are '+ arr.length + ' elements in this array';
};
module.exports = counter;

// ------------app.js-------------
// call the counter function of count.js in app.js
var counter = require('./count');
console.log(counter([1,2,3,4,3,3]));

```

## Module Patterns
* different ways of writing and exporting modules

## Event - events Module
* a signal indicates that something has happened
* emit: make or produce a noise
* EventEmitter:
  * A class, needs to be instantiated when used
  * raise an event, signalling that someting has happened
* Register a listener to an event, which responds to the specific event
* Listener should be registered before the event is raised

```javaScript
// get the EventEmitter class
const EventEmitter = require('events');
// create an actual event emitter object in order to use it
const emitter = new EventEmitter();

// Register a Listener
// on = addListener
emitter.on('msgLogged',function() {
  console.log('Listener Called');
})

// Raise an event
emitter.emit('msgLogged');

```

## Events, Class and Util
```javaScript
var events = require('events');
var util = require('util');

var Person = function(name){ // Define Person Class
  this.name = name;
};

// Let Person inherits from EventEmitter, so that we can attach custom events to person
util.inherits(Person, events.EventEmitter);

// Create Person Objects
var james = new Person('james');
var mary = new Person('mary');
var tizzy = new Person('tizzy');
var people = [james, mary, tizzy]; // Create People Array

// Loop through the people array
people.forEach(function(person){
  person.on('speak',function(msg){ // Listener: responds to event
    console.log(person.name + ' said: ' + msg);
  });
});

// Emitter: raise an event
james.emit('speak',"What's up dude?");
tizzy.emit('speak',"I feel fantastic!");
```

## File - fs Module
* Synchronous Read and Write
* Asynchronous Read and Write


```javaScript
var fs = require('fs');
// Both read and write operations are synchronous in this case
var readMe = fs.readFileSync('readMe.txt','utf8');
fs.writeFileSync('writeMe.txt',readMe);
```
```javaScript
var fs = require('fs');
var data = fs.readFile('readMe.txt','utf8',function(err, data) {
  // the thrid parameter defines a callback function to be invoked
  // when the opertaion completes
  fs.writeFile('writeMe.txt', data, function(err, result){
    if(err) console.log('error', err);
  });
});

```
## Delete File

* Also asychronous, better no write and delete the same file using asychronous fucntion


```javaScript
fs.unlink('writeMe.txt',function(){
  console.log("Delete Sucess");
});

```

## Create and Delete Directory
* synchronous: block the code followed
* asynchronous: independent, simultaneously, usually assoiciated with a callback function once completed

```javaScript
var fs = require('fs');
fs.mkdirSync('stuff');
setTimeout(function(){
  fs.rmdirSync('stuff'); // remove the directory 5 seconds later
},5000);

```

```javaScript
var fs = require('fs');
// create a stuff2 directory
// copy data from readMe into
// a new file writeMe in stuff2 directory
fs.mkdir('stuff2', function(){
  fs.readFile('readMe.txt', 'utf8', function(err, data){
    fs.writeFile('./stuff2/writeMe.txt',data, function (){
      console.log("Write Sucess!");
    });
  });
});
```

```javaScript
// Remove all the files inside before removing any directory
fs.unlink('./stuff2/writeMe.txt', 'utf8', function(){
  fs.rmdir('stuff2', function(){
    console.log("Remove Success");
  })
})

```
