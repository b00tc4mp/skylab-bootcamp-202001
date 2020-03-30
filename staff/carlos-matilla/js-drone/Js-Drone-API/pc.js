const dgram = require('dgram')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const ws = require('ws')
const throttle = require('lodash/throttle')
var wifi = require("node-wifi")


const { parseState, handleError } = require("./../Js-Drone-UTILS")
const { WifiError, NotAllowedError } = require('./../Js-Drone-ERRORS')


const HOST = '192.168.10.1'
let drone = dgram.createSocket('udp4')
let video = dgram.createSocket('udp4')
let telemetria = dgram.createSocket('udp4')
drone.bind(8889)
video.bind(11111)
telemetria.bind(8890)


let semaforo
let videoBuffer = []
let counter = 0


if (semaforo) throw new NotAllowedError(`PORT ${port} already in use`)

const websocket = new ws.Server({ port: 2212 }, ()=>{
    let res = 'Websocket connected'
    process.send(res)
})

semaforo = true

websocket.on('connection', function connection(websocket) {
    console.log('websocket connected')

    websocket.on('error', (err) => {
        console.log('websocket error', err)
        throw new NotAllowedError(`Websocket error on PORT ${port}`)
    })


    wifi.init({
        iface: null
    })

    function seekWifi() {

        wifi.getCurrentConnections(function (err, currentConnections) {
            if (err) {
                console.log(err);
            }
            if (currentConnections.length > 0 && currentConnections[0].ssid.indexOf('TELLO') > -1) {
                try {
                    setTimeout(() => {
                        console.log('tello connected')
                        clearInterval(seekingTello)
                        callDrone()
                        
                    }, 3000);

                } catch (error) {
                    console.log('try 1', error)
                    throw new WifiError('Wifi connection error')
                }

            } else {

                console.log('seeking Wifi enpoints, searching for TELLO')
                wifi.scan(function (err, response) {
                    if (err) console.log(error)
                    for (var i = response.length - 1; i >= 0; i--) {
                        if (response[i].ssid.indexOf('TELLO') > -1) {
                            wifi.connect(response[i], function (err, response) {
                                if (err) {
                                    console.log('Wifi connection error')
                                    return
                                }

                            })
                        }
                    }
                })
            }
        }
        )
    }


    const seekingTello = setInterval(() => {
        seekWifi()
    }, 6000)
  

    function callDrone() {

        drone.on('message', message => {
            console.log(`Tello DICE: ${message}`)
            io.sockets.emit('status', message.toString())
        })

        drone.send('command', 0, 'command'.length, 8889, HOST, handleError)
        drone.send('streamon', 0, 8, 8889, HOST, handleError)
        drone.send('battery?', 0, 8, 8889, HOST, handleError)

        telemetria.on('error', (err) => {
            console.log('drone telemetria error', err)
            telemetria.close()
        })

        telemetria.on('message', throttle(state => {
            const formattedState = parseState(state.toString())
            io.sockets.emit('dronestate', formattedState)
        }, 200))

        drone.on('close', function () {
            console.log('Drone connection is closed !')
        })

        telemetria.on('close', function () {
            console.log('Telemetria connection is closed !')
        })

    }


    websocket.on('close', (message) => {
        console.log('web socket disconnected', message)
        clearInterval(seekingTello)
    })

})



io.on('connection', socket => {
    console.log('socket io connected')

    socket.on('control', function (msg) {
        console.log(msg)
        drone.send(msg, 0, msg.length, 8889, '192.168.10.1', handleError)
    })

    socket.on('stop', function () {
        process.exit(0)
    })
    socket.on('disconnect', () => {
        console.log('socket io disconnected')
    })

})


video.on('error', (err) => {
    console.log('drone video error', err)
    video.close()
})

video.on('close', function () {
    console.log('Video connection is closed !')
})

video.on('message', (message) => {
    let buffer = Buffer.from(message)
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


http.listen(1992, () => { })





