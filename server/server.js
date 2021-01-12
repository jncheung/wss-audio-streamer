var io = require('socket.io')(80)
var ss = require('socket.io-stream');
var path = require('path');
const fs = require('fs') 


io.of('/user').on('connection', function(socket) {
  ss(socket).on('audio', function(stream, data) {
    var filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(filename));
  });
});