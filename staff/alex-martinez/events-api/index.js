require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process
const mongoose = require('mongoose')
const express = require('express')
const winston = require('winston')
const { registerUser, authenticateUser, retrieveUser, createEvent, retrievePublishedEvents, retrieveLastEvents, subscribeEvent, retrieveSubscribedEvents, updateEvent } = require('./routes')
const { name, version } = require('./package')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { jwtVerifierMidWare } = require('./mid-wares')
const { database } = require('./data')

mongoose.connect(MONGODB_URL)
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

        app.use(morgan('combined', { stream: accessLogStream }))

        app.post('/users', jsonBodyParser, registerUser)

        app.post('/users/auth', jsonBodyParser, authenticateUser)

        app.get('/users', jwtVerifierMidWare, retrieveUser)

        app.post('/users/events', [jwtVerifierMidWare, jsonBodyParser], createEvent)

        app.get('/users/:id/events', jwtVerifierMidWare, retrievePublishedEvents)

        app.get('/events', retrieveLastEvents)

        app.patch('/events/:id', [jwtVerifierMidWare, jsonBodyParser], subscribeEvent)

        app.get('/users/subscribed-events', jwtVerifierMidWare, retrieveSubscribedEvents)

        app.patch('/events-update/:id', [jwtVerifierMidWare, jsonBodyParser], updateEvent)


        app.listen(port, () => logger.info(`server ${name} ${version} up and running on port ${port}`))

        process.on('SIGINT', () => {
            logger.info('server abruptly stopped')

            process.exit(0)
        })
    })