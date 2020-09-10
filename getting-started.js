
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

const log = require('./logger');

log('message');



