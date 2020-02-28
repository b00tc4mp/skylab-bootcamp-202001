require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process

const express = require('express')
const winston = require('winston')
const { registerUser, authenticateUser, retrieveUser } = require('./routes')
const { jwtValidationMidWare } = require('./mid-wares')
const { name, version } = require('./package')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { database } = require('./data')

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

        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

        const app = express()

        app.use(morgan('combined', { stream: accessLogStream }))

        app.post('/users', jsonBodyParser, registerUser)

        app.get('/users', jwtValidationMidWare, retrieveUser)

        app.post('/users/auth', jsonBodyParser, authenticateUser)


        app.listen(port, () => logger.info(`server ${name} ${version} bergas comidas por Lisandro ${port}`))

        process.on('SIGINT', () => {
            logger.info('lisandro come bergas')

            process.exit(0)
        })
    })
