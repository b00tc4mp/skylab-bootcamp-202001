require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process

const express = require('express')
const winston = require('winston')

const { jwtValidationMidWare } = require('./mid-wares')
const cors = require('cors')
const { name, version } = require('./package')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { mongoose } = require('events-data')
const { registerUser,
    authenticateUser,
    retrieveUser,
    createEvent,
    retrievePublishedEvents,
    retrieveLastEvents,
    subscribeEvent,
    retrieveSubscribedEvents,
    updateEvent,
    deleteEvent,
    deleteUser } = require('./routes')

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

        const jsonBodyParser = bodyParser.json()

        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

        const app = express()

        app.use(cors())

        app.use(morgan('combined', { stream: accessLogStream }))

        app.post('/users', jsonBodyParser, registerUser)

        app.get('/users', jwtValidationMidWare, retrieveUser)

        app.post('/users/auth', jsonBodyParser, authenticateUser)

        app.post('/users/:id?/events', [jwtValidationMidWare, jsonBodyParser], createEvent)

        app.get('/users/:id?/events', jwtValidationMidWare, retrievePublishedEvents)

        app.get('/users/:id?/subscribed-events', jwtValidationMidWare, retrieveSubscribedEvents)

        app.patch('/users/:id?/events', [jwtValidationMidWare, jsonBodyParser], subscribeEvent)

        app.patch('/events/:id', [jwtValidationMidWare, jsonBodyParser], updateEvent)

        app.delete('/users/events/:id', jwtValidationMidWare, deleteEvent)

        app.delete('/users', [jwtValidationMidWare, jsonBodyParser], deleteUser)

        app.get('/events/:page?', retrieveLastEvents)



        app.listen(port, () => {
            logger.info(`server ${name} ${version} started on port ${port}`)
        })

        process.on('SIGINT', () => {
            logger.info('server abrutly stopped')

            process.exit(0)
        })
    })
    .catch(error => {
        console.log(error.message)
    })
