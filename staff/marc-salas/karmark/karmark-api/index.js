require('dotenv').config()

const { env: { PORT = 8085, NODE_ENV: env, MONGODB_URL}, argv: [, , port = PORT] } = process

debugger
const express = require('express')
const winston = require('winston')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createProgram,
    deleteProgram,
    retrieveUserPrograms
} = require('./routes')
const { name, version } = require('./package')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { jwtVerifierMidWare } = require('./mid-wares')
const cors = require('cors')
const { mongoose } = require('karmark-data')
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

        //const accessLogStream = fs.createReadStream(path.join(__dirname, 'access.log'), {flags: 'a'})

        const app = express()

        app.use(cors())

        //app.use(morgan('combined', {stream: accessLogStream}))

        app.post('/users', jsonBodyParser, registerUser)

        app.post('/users/auth', jsonBodyParser, authenticateUser)

        app.get('/users', jwtVerifierMidWare, retrieveUser)

        app.post('/users/programs', jsonBodyParser, jwtVerifierMidWare,  createProgram)

        app.get('/programs', jwtVerifierMidWare, retrieveUserPrograms)

        app.delete('/delete', jsonBodyParser, jwtVerifierMidWare, deleteProgram)

        app.listen(port, () => logger.info(`server ${name} ${version} up and running on port ${port}`))
              
        process.on('SIGINT', () => {
            logger.info('server abruptly stopped')

            process.exit(0)
        })
    })
    .catch(error => console.error(error.message))
