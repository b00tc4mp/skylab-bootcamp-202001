const dgram = require('dgram')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const throttle = require('lodash/throttle');
const ws = require('ws');
const websocket = new ws.Server({ port: 8080 });


const PORT = 8889;
const HOST = '192.168.10.1';
const drone = dgram.createSocket('udp4')
const video = dgram.createSocket('udp4')
drone.bind(PORT)
video.bind(11111)

function parseState(state) {
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});
}

const telemetria = dgram.createSocket('udp4')
telemetria.bind(8890)



drone.on('message', message => {
  console.log(`RER DICE: ${message}`)
  // socket.emit('status', 'CONNECTED')
})

function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}

drone.send('command', 0, 'command'.length, PORT, HOST, handleError);
drone.send('streamon', 0, 8, PORT, HOST, (err) => console.log(err));
drone.send('battery?', 0, 8, PORT, HOST, (err) => console.log(err));

websocket.on('connection', function connection(websocket) {
  console.log('web socket is connected!');
  websocket.on('error', (err) => {
    console.log('websocket error', err);
  });
  websocket.on('close', (message) => {
    console.log('web socket is closed', message);
  });
});

// video.on('message', message =>{
//   console.log(`video ${message}`)

// })



io.on('connection', socket =>{
  socket.on('gamepad', function(msg){
    drone.send(msg, 0, msg.length, 8889, '192.168.10.1', handleError)
  })
  socket.on('keyboard', function(msg){
    drone.send(msg, 0, msg.length, 8889, '192.168.10.1', handleError)
  })
});

let videoBuffer = [];
let counter = 0;

video.on('error', (err) => {
  console.log('drone video error', err);
  video.close();
});

video.on('message', (message) => {
  let buffer = Buffer.from(message);
  if(buffer.indexOf(Buffer.from([0, 0, 0, 1])) !== -1) {
    counter++;
    if(counter === 3) {
      let temp = Buffer.concat(videoBuffer);
      counter = 0;
      websocket.clients.forEach(client => {
        if(client.readyState === ws.OPEN) {
          try {
            client.send(temp);
          } catch(err) {
            console.log('websocket fail to send', err);
          }
        }
      });
      videoBuffer.length = 0;
    }
    videoBuffer.push(buffer);
  } else {
    videoBuffer.push(buffer);
  }
});

telemetria.on('message', throttle(state => {
  const formattedState = parseState(state.toString());
  io.sockets.emit('dronestate', formattedState);
  
}, 300))

 

http.listen(6767, () => {
  console.log('Socket io server up and running on port 6767');
});
