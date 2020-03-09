const dgram = require('dgram')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const throttle = require('lodash/throttle');
// const video = dgram.createSocket('udp4')


const PORT = 8889;
const HOST = '192.168.10.1';
const drone = dgram.createSocket('udp4')
drone.bind(PORT)

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
// video.bind(11111)


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


telemetria.on('message', throttle(state => {
  const formattedState = parseState(state.toString());
  io.sockets.emit('dronestate', formattedState);
  
}, 300))

 

http.listen(6767, () => {
  console.log('Socket io server up and running on port 6767');
});
