const dgram = require('dgram')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const drone = dgram.createSocket('udp4')
const telemetria = dgram.createSocket('udp4')
const throttle = require('lodash/throttle');
// const video = dgram.createSocket('udp4')


const PORT = 8889;
const HOST = '192.168.10.1';


drone.bind(PORT)
telemetria.bind(8890)
// video.bind(11111)


drone.on('message', message => {
  console.log(`TELLO DICE: ${message}`)
  
})
drone.send('command', 0, 'command'.length, PORT, HOST, handleError);
io.on('connection', function(socket){

  socket.emit('status', 'CONNECTED')
 
})


// video.on('message', message =>{
//   console.log(`video ${message}`)

// })


function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}




io.on('connection', function(socket){
  socket.on('gamepad', function(msg){
    drone.send(msg, 0, msg.length, 8889, '192.168.10.1', handleError)
  })
  socket.on('keyboard', function(msg){
    drone.send(msg, 0, msg.length, 8889, '192.168.10.1', handleError)
  })
});

function parseState(state) {
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});
}

telemetria.on('message', throttle(state => {
  const formattedState = parseState(state.toString());
  io.sockets.emit('dronestate', formattedState);
  
}, 100))

 
  




http.listen(6767, () => {
  console.log('Socket io server up and running on port 6767');
});

