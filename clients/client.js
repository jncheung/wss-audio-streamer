var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs')
const audioRecorder = require('./recorder/index')
var socket = io.connect('http://localhost/user');
var stream = ss.createStream();
// var filename = 'user.jpeg';
const DIRECTORY = 'examples-recordings';
const fileName = path.join(DIRECTORY, Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4).concat('.wav'));

ss(socket).emit('audio', stream, {name: filename});
// ss(socket).emit('profile-image', stream, {name: filename});
fs.createReadStream(filename).pipe(stream);