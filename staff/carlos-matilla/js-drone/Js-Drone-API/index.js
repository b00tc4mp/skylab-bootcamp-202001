require('dotenv').config()

const { env: { PORT = 6767, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process


const dgram = require('dgram')
const app = require('express')()
const http = require('http').Server(app)
const httpIo = require('http').Server(app)
const io = require('socket.io')(httpIo)
const { mongoose } = require('./../Js-Drone-DATA')
const ws = require('ws')
const winston = require('winston')
const { name, version } = require('./package')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const router = require('./routes')
const { cors } = require('./mid-wares')
const throttle = require('lodash/throttle');
var wifi = require("node-wifi");

// const websocket = new ws.Server({ port: 8080 })

// const { parseState, handleError } = require("./../Js-Drone-UTILS")
// const { WifiError, NotAllowedError } = require('./../Js-Drone-ERRORS')


// const HOST = '192.168.10.1'
// let drone = dgram.createSocket('udp4')
// let video = dgram.createSocket('udp4')
// let telemetria = dgram.createSocket('udp4')
// drone.bind(8889)
// video.bind(11111)
// telemetria.bind(8890)

// let semaforo
// let videoBuffer = []
// let counter = 0

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const logger = winston.createLogger({
      level: env === 'development' ? 'debug' : 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'server.log' })
      ]
    })

    if (env !== 'production') {
      logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }))
    }

    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    // Drone connections

    // wifi.init({
    //   iface: null // network interface, choose a random wifi interface if set to null
    // })


    // // if (semaforo) reject(new NotAllowedError(`Drone already in use`))


    // semaforo = false

    // setInterval(() => {
    //   if (semaforo) { seekWifi() }

    // }, 5000)

    // websocket.on('connection', function connection(websocket) {
    //   console.log('websocket connected')

    //   websocket.on('error', (err) => {
    //     console.log('websocket error', err)
    //     // reject(new NotAllowedError(`Websocket error on PORT ${port}`))
    //   })


    //   websocket.on('close', (message) => {
    //     console.log('web socket disconnected', message)

    //   })

    // })




    // function seekWifi() {

    //   wifi.getCurrentConnections(function (err, currentConnections) {
    //     if (err) {
    //       console.log(err);
    //     }
    //     if (currentConnections.length > 0 && currentConnections[0].ssid.indexOf('TELLO') > -1) {
    //       try {
    //         setTimeout(() => {

    //           console.log('tello connected')
    //           drone = dgram.createSocket('udp4')
    //           video = dgram.createSocket('udp4')
    //           telemetria = dgram.createSocket('udp4')
    //           drone.bind(8889)
    //           video.bind(11111)
    //           telemetria.bind(8890)
    //           callDrone()
    //         }, 4000)

    //       } catch (error) {
    //         console.log('try 1', error)
    //         // reject(new WifiError())
    //       }

    //     } else {

    //       console.log('seeking Wifi enpoints, searching for TELLO')

    //       wifi.scan(function (err, response) {
    //         if (err) console.log('not allowed error')
    //         for (var i = response.length - 1; i >= 0; i--) {
    //           if (response[i].ssid.indexOf('TELLO') > -1) {
    //             wifi.connect(response[i], function (err, response) {
    //               if (err) {
    //                 console.log('Wifi connection error')
    //                 return
    //               }
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    //   )
    // }

    // io.on('connection', socket => {
    //   console.log('socket io connected')

    //   socket.on('control', function (msg) {
    //     drone.send(msg, 0, msg.length, 8889, '192.168.10.1', handleError)
    //   })

    //   socket.on('start', () => {
    //     drone.close()
    //     telemetria.close()
    //     video.close()
    //     semaforo = true
    //   })


    //   socket.on('disconnect', () => {
    //     console.log('socket io disconnected')
    //   })

    // })

    // function callDrone() {
    //   console.log('tello connected 2222')
    //   drone.on('message', message => {
    //     console.log(`Tello DICE: ${message}`)
    //     io.sockets.emit('status', message.toString())
    //   })

    //   drone.send('command', 0, 'command'.length, 8889, HOST, handleError)
    //   drone.send('streamon', 0, 8, 8889, HOST, handleError)
    //   drone.send('battery?', 0, 8, 8889, HOST, handleError)

    //   semaforo = false

    //   telemetria.on('error', (err) => {
    //     console.log('drone telemetria error', err)
    //     telemetria.close()
    //   })

    //   telemetria.on('message', throttle(state => {
    //     const formattedState = parseState(state.toString())
    //     io.sockets.emit('dronestate', formattedState)
    //   }, 200))

    //   drone.on('close', function () {
    //     console.log('Drone connection is closed !')
    //   })

    //   telemetria.on('close', function () {
    //     console.log('Telemetria connection is closed !')
    //   })

    // }


    // video.on('error', (err) => {
    //   console.log('drone video error', err)
    //   video.close()
    // })

    // video.on('close', function () {
    //   console.log('Video connection is closed !')
    // })

    // video.on('message', (message) => {
    //   let buffer = Buffer.from(message)
    //   if (buffer.indexOf(Buffer.from([0, 0, 0, 1])) !== -1) {
    //     counter++
    //     if (counter === 3) {
    //       let temp = Buffer.concat(videoBuffer)
    //       counter = 0
    //       websocket.clients.forEach(client => {
    //         if (client.readyState === ws.OPEN) {
    //           try {
    //             client.send(temp)
    //           } catch (err) {
    //             console.log('websocket fail to send', err)
    //           }
    //         }
    //       })
    //       videoBuffer.length = 0
    //     }
    //     videoBuffer.push(buffer)
    //   } else {
    //     videoBuffer.push(buffer)
    //   }
    // })




    // httpIo.listen(6769)




    // Shit connections




    app.use(cors)

    app.use(morgan('combined', { stream: accessLogStream }))

    app.use('/api', router)

    http.listen(port, () => logger.info(`server ${name} ${version} up and running on port ${port}`))

    process.on('SIGINT', () => {
      logger.info('server abruptly stopped')
      process.exit(0)
    })

  })
