
// Getting Started

// 4 - How Node Works

//Node's architecture makes it ideal for building applications that include alot of disk
//or network access. We can serve more clients without the need to throw in more hardware.
//And that's why node applications are highly scalable. In contrast, Node should not be used
//for CPU-intensive applications like video encoding or an image manipulation service. In this
//kind of applications, we have alot of calculations that should be done by the CPU, and few
//operations that touch the file system or network. Since Node applications are single threaded,
//when performing the calculations to serve one client, other clients have to wait, and that,s why
//Node should not be used for CPU-intensive applications. It should only be used for building data
//intensive and real-time applications.

// function sayHello(name) {
//     console.log('Hello ' + name);
// }
// sayHello('Mukhtar');


// Node Module System

// 3 - Global Object

//So let's just log this module object and see what we see in the console.log. Back in the terminal.
//So you can see that we an object module that's a json object. So in Node, every file is a module,
//and the variables and functions defined in that file are a scope to that module, they are not available
//outside of that module.
//**console.log(module);

// 4 - Creating a Module

//Inside logger.js
// var url = 'http://mylogger.io/log';

// function log(message){
//     //send an HTTP request
//     console.log(message);
// }

// module.export.log = log;

// 5 - Loading a Module

// const log = require('./logger');

// log('message');


//6 - Module Wrapper Function

// const log = require('./logger');

// log('message');

//Inside logger.js
// console.log(__filename);
// console.log(__dirname);

// var url = 'http://mylogger.io/log';

// function log(message){
//     //send an HTTP request
//     console.log(message);
// }

// module.exports = log;


// 7 - Path Module

// const path = require('path');

// var pathObj = path.parse(__filename);

// console.log(pathObj); // => inside terminal, call node getting- started.js
//{
//     root: '/',
//     dir: '/home/mukhtar/Documents/Complete-Node.js-Course',
//     base: 'getting-started.js',
//     ext: '.js',
//     name: 'getting-started'
//   }


// 8 - OS Module

// const os = require('os');


// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);


// 9 - File System Module
//If you're using node to build a backend of your application you might have sevaral
//hundreds or thousands of clients connecting to the backend. if you keep that single thread
//busy, you won't be able to serve many clients. So always use asynchronous methods.

// const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log(files); // => inside terminal, call node getting- started.js
//[
//     '.git',
//     'Getting-Started-Recap.pdf',
//     'Node Core Recap.pdf',
//     'getting-started.js',
//     'logger.js'
//   ]


// 10 - Events Module

//An Event is basically a singnal that indicates that something has happened in
//our application. For example, in Node, we have a class called HTTP that we can use 
//to build a web server. So we listen on a given port, and every time we recieve a request
//on that port, that HTTP class raises an event. Now our job is to respond to that event
//which basically involves reading that request and returning the right response. So as you
//go through Node's documentation, you can see that several classes in Node raises different
//kind of events. EventEmitter is a class. A class is a container, for a bunch of related methods
//and properties.
//Emit basically means making a noise, or produce something. In this case, you're  making a noise
//in your application, you are singnalling that an event has happened.
//Because we have raised an event, but nowhere in our application we've registered a Listener that
//is interested in that event. A Listener is a function that would be called when an event is raised.
// The order of arrangement of registering a listener and raising an event is important. Registering
//a listener must come first. Because, when we call the emit method, the emitter iterates over all
//the registered listeners and calls them synchronously.

// const EventEmitter = require('events');

// const emitter = new EventEmitter();

// //Register a Listener
// emitter.on('messageLogged', function() {
//     console.log('Listener called');
// }); // on() or addListner(). Former mostly used.
// // node getting-started.js => Listener called

// //Raise an event
// emitter.emit('messageLogged');


// 11 - Event Arguments

// const EventEmitter = require('events');

// const emitter = new EventEmitter();

// //Register a Listener
// emitter.on('messageLogged', (arg) => {
//     console.log('Listener called', arg);
// }); // node getting-started.js => Listener called { id: 1, url: 'http://' } 

// //Raise an event
// emitter.emit('messageLogged', { id: 1, url: 'http://' });


// 12 - Extending EventEmitter

//In a real world application, it's rear that we would work with this EventEmitter object
//directly. Instead we would want to create a class that has all the capabilities of the
//EventEmitter, and then we would use that class in our code. So let's copy the EventEmitter
//code from the getting-started module to the logger module. And also, to move the raising an event
//code to the logger module as well, because it's the logger module that emits or signal an event,
//saying the message is logged. We need to load the logger module and call the log function that is
//in the logger module with a message. When we run this application in the terminal, we are only going
//to see the 'message' on the console, that is the event listener will not be called. The reason for this
//is because we are working with two different EventEmitter objects, one in getting-started module and the
//other in logger module. In logger module we are using the emitter object to emit an event, where as in the
//getting-started module, we are using another event emitter object to handle the event. So they are completely
//different. So when we register a listener in the getting-started module, it is only registered with the EventEmitter
//in that module, which is completely different from the EventEmitter in the logger module. So, it's rare that you would
//work with the EventEmitter in the logger module directly. Instead, you would want to create a class that has all the
//capabilities of the EventEmitter, and has other additional capabilities. In this case, we want to create a class called
//Logger, that has the additional method log. So, we have  the Logger class, and the log function moved into the Logger
//class, now becomes a method. Now instead of exporting the log function, we now export the Logger class. We also want
//the Logger class to have all the capabilities of the the EventEmitter in the logger module. The way we do that is to
//use the Extends keyword that comes in ES6. So, we add the name of the parent or the base class, that's EventEmitter.
//And with this simple change, the Logger class will have all the functionality that is defined in the EventEmitter.
// So, inside the Logger class, instead of using the emitter object to raise an event, we use THIS keyword. So, we can
//directly emit or raise an event from the Logger class. Now, we no longer need the emitter object created from the
//EventEmitter class in the logger module, so we delete it. So, in the getting-started module when requiring a logger
//module, we get a class, so we rename it.
//Similar to the change we made in the logger module, we no longer need the EventEmitter in this module as well. We
//want to work directly with the logger object. So we're going to register the listener on the logger object, we 
//move the listener after the created logger object.


const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

//Register a Listener
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

logger.log('message');





