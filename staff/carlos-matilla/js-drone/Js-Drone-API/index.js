require('dotenv').config()

const { env: { PORT = 6767, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process


const dgram = require('dgram')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
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

    const websocket = new ws.Server({ port: 8080 });

    const HOST = '192.168.10.1';
    const drone = dgram.createSocket('udp4')
    const video = dgram.createSocket('udp4')
    const telemetria = dgram.createSocket('udp4')
    drone.bind(8889)
    video.bind(11111)
    telemetria.bind(8890)


    drone.on('message', message => {
      console.log(`Tello DICE: ${message}`)
    })

    function handleError(err) {
      if (err) {
        console.log('ERROR');
        console.log(err);
      }
    }

    drone.send('command', 0, 'command'.length, 8889, HOST, handleError);
    drone.send('streamon', 0, 8, 8889, HOST, handleError);
    drone.send('battery?', 0, 8, 8889, HOST, handleError);

    websocket.on('connection', function connection(websocket) {
      
      websocket.on('error', (err) => {
        console.log('websocket error', err);
      });
      websocket.on('close', (message) => {
        console.log('web socket is closed', message);
      });
    });



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

    telemetria.on('error', (err) => {
      console.log('drone telemetria error', err);
      telemetria.close();
    });

    telemetria.on('message', throttle(state => {
      const formattedState = parseState(state.toString());
      io.sockets.emit('dronestate', formattedState);
      
    }, 100))


    function parseState(state) {
      return state
        .split(';')
        .map(x => x.split(':'))
        .reduce((data, [key, value]) => {
          data[key] = value;
          return data;
        }, {});
    }
    

    // shit connections

    app.use(cors)

    app.use(morgan('combined', { stream: accessLogStream }))

    app.use('/api', router)

    http.listen(port, () => logger.info(`server ${name} ${version} up and running on port ${port}`))

    process.on('SIGINT', () => {
        logger.info('server abruptly stopped')
        process.exit(0)
    })

  })
