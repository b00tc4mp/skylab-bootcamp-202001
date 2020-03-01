require('dotenv').config()
const {env: {PORT = 8080, NODE_ENV: env, MONGODB_URL}, argv: [,,port = PORT]} = process

const express = require('express')
const winston = require('winston')
const {registerUser, authenticateUser, retrieveUser, updateUser, deleteUser, createEvent, 
  retrieveLastEvents, retrievePublishedEvents, subscribeEvent,
  retrieveSubscribedEvents, updateEvent, deleteEvent} = require('./routes')

const {name, version} = require('./package')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const {jwtVerify} = require('./middlewares')

const {database} = require('./data')

database.connect(MONGODB_URL)
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
    
    const jsonBodyParser = bodyParser.json()
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
    const app = express()
    
    app.use(morgan('combined', { stream: accessLogStream }))
    
    // Public Routes
    app.get('/', (req, res) => res.send("Welcome to API Events"))
    app.post('/users', jsonBodyParser, registerUser)
    app.post('/auth/users', jsonBodyParser, authenticateUser)

    // Private Routes
    app.get('/users', jwtVerify, retrieveUser)
    app.patch('/users', jsonBodyParser, jwtVerify, updateUser)
    app.delete('/users', jwtVerify, deleteUser)

    // Events Routes
    app.post('/users/events', jsonBodyParser, jwtVerify, createEvent)

    app.get('/events/:id?', jwtVerify, retrieveLastEvents)
    app.get('/users/:id?/published-events', jwtVerify, retrievePublishedEvents)
    app.patch('/users/:id?/subscribe-events', jsonBodyParser, jwtVerify, subscribeEvent)

    app.get('/users/:id?/subscribed-events', jwtVerify, retrieveSubscribedEvents)
    app.patch('/users/events/:eventId', jsonBodyParser, jwtVerify, updateEvent)

    app.delete('/events/:eventId', jwtVerify, deleteEvent)


    app.listen(port, () => console.log(`${name} ${version} running on port ${port}`))
    
    process.on('SIGINT', () => {
      logger.info('server abruptly stopped')
    
      process.exit(0)
    })

  })
