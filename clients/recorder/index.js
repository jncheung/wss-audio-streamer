

// Starting the recording on local machine

(()=>{
var io = require('socket.io-client');
var ss = require('socket.io-stream');
var socket = io.connect('http://localhost/user');
const AudioRecorder = require('node-audiorecorder')

const fs = require('fs'),  
    path = require('path');
    
const DIRECTORY = 'examples-recordings';

    if (!fs.existsSync(DIRECTORY)){
        fs.mkdirSync(DIRECTORY);
    }

    const options = {
        program: `rec`,     // Which program to use, either `arecord`, `rec`, or `sox`.
        bits: 16,           // Sample size. (only for `rec` and `sox`)
        rate: 16000,        // Sample rate.
        type: `wav`,        // Format type.
      };
      const logger = console;

    let audioRecorder = new AudioRecorder(options, logger);
    const fileName = path.join(DIRECTORY, Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4).concat('.wav'));
    console.log('Writing new recording file at: ', fileName);
    const fileStream = fs.createWriteStream(fileName, { encoding: 'binary' });
    // fs.createReadStream(fileName).pipe(stream);
    var stream = ss.createStream();

    audioRecorder.start().stream().pipe(stream);

    audioRecorder.stream().on('close', function(code) {
        console.warn('Recording closed. Exit code: ', code);
      });
    audioRecorder.stream().on('end', function() {
    console.warn('Recording ended.');
    });

    audioRecorder.stream().on('error', function() {
        console.warn('Recording error.');
    });

    audioRecorder.stream().on('data', function(chunk) {
        console.log(chunk)
        // try{
            // await putchunkObject(chunk,fileName);
        // }catch(err) { console.log(err)}

    })

    ss(socket).emit('audio', stream, {name: fileName});

})()