const dgram = require('dgram')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const ws = require('ws')
const throttle = require('lodash/throttle')
var wifi = require("node-wifi")


const HOST = '192.168.10.1'
const drone = dgram.createSocket('udp4')
const video = dgram.createSocket('udp4')
const telemetria = dgram.createSocket('udp4')
drone.bind(8889)
video.bind(11111)
telemetria.bind(8890)
let semaforo 

function parseState(state) {
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});
}

function handleError(err) {
  if (err) {
    console.log('ERROR')
    console.log(err)
  }
}

module.exports = (port) => new Promise((resolve, reject) => {

  // TODO call reject on error points
  console.log(port)
  if(semaforo) reject(new Error(`PORT ${port} already in use`))

  const websocket = new ws.Server({ port: port }, resolve(port))
  semaforo = true

  websocket.on('connection', function connection(websocket) {
    console.log('websocket connected')
    websocket.on('error', (err) => {
      console.log('websocket error', err)
    })


    io.on('connection', socket => {
      console.log('socket io connected')
      socket.on('control', function (msg) {
        drone.send(msg, 0, msg.length, 8889, '192.168.10.1', handleError)
      })
      socket.on('stop', function () {
        semaforo = false
        socket.disconnect()
        websocket.close()
        clearInterval(seekingTello)
      })
      socket.on('disconnect', () => {
        console.log('socket io disconnected')
      });
    })


    wifi.init({
      iface: null // network interface, choose a random wifi interface if set to null
    })

    function seekWifi() {

      wifi.getCurrentConnections(function (err, currentConnections) {
        if (err) {
          console.log(err);
        }
        if (currentConnections.length > 0 && currentConnections[0].ssid.indexOf('TELLO') > -1) {
          try {
            console.log('tello connected')
            clearInterval(seekingTello)
            callDrone()
          } catch (error) {
            console.log('try', error)
          }
         
        }

        console.log('seeking Wifi enpoints, searching for TELLO')

      
        wifi.scan(function (err, response) {
          if (err) console.log(err)
          for (var i = response.length - 1; i >= 0; i--) {
            if (response[i].ssid.indexOf('TELLO') > -1) {
              wifi.connect(response[i], function (err, response) {
                if (err) {
                  console.log('Wifi connection error')
                  return
                }
                try {
                  console.log('tello connected')
                  clearInterval(seekingTello)
                  callDrone()
                } catch (error) {
                  console.log('try', error)
                }
              })
            }
          }
        })
      }
      )
    }
    const seekingTello = setInterval(() => {
      seekWifi()
    }, 9000);



    function callDrone() {

      drone.on('message', message => {
        console.log(`Tello DICE: ${message}`)
        io.sockets.emit('status', message.toString())
      })

      drone.send('command', 0, 'command'.length, 8889, HOST, handleError);
      drone.send('streamon', 0, 8, 8889, HOST, handleError);
      drone.send('battery?', 0, 8, 8889, HOST, handleError)

      telemetria.on('error', (err) => {
        console.log('drone telemetria error', err);
        telemetria.close();
      })

      telemetria.on('message', throttle(state => {
        const formattedState = parseState(state.toString())
        io.sockets.emit('dronestate', formattedState)
      }, 100))

    }

 
  
    websocket.on('close', (message) => {
      console.log('web socket disconnected', message)
     
    })

  })



  let videoBuffer = [];
  let counter = 0;

  video.on('error', (err) => {
    console.log('drone video error', err);
    video.close();
  })

  video.on('message', (message) => {
    let buffer = Buffer.from(message);
    if (buffer.indexOf(Buffer.from([0, 0, 0, 1])) !== -1) {
      counter++
      if (counter === 3) {
        let temp = Buffer.concat(videoBuffer)
        counter = 0
        websocket.clients.forEach(client => {
          if (client.readyState === ws.OPEN) {
            try {
              client.send(temp)
            } catch (err) {
              console.log('websocket fail to send', err)
            }
          }
        })
        videoBuffer.length = 0
      }
      videoBuffer.push(buffer)
    } else {
      videoBuffer.push(buffer)
    }
  })

  http.listen(6768, () => { })
})


  