const EventEmitter = require('events');
const emitter = new EventEmitter();

var url = 'http://mylogger.io/log';

function log(message){
    //send an HTTP request
    console.log(message);

    //Raise an event
emitter.emit('messageLogged', { id: 1, url: 'http://' });
}

module.exports = log;


