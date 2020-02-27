require('dotenv').config()
const {env: {PORT = 8080, NODE_ENV: env}, argv: [,,port = PORT]} = process

const express = require('express')
const winston = require('winston')
const {registerUser, authenticateUser, retrieveUser} = require('./routes')
const {name, version} = require('./package')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const {jwtVerify} = require('./middlewares')


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

app.post('/users', jsonBodyParser, registerUser)
app.post('/auth/users', jsonBodyParser, authenticateUser)
app.get('/users', jwtVerify, retrieveUser)

app.listen(port, () => console.log(`${name} ${version} running on port ${port}`))

process.on('SIGINT', () => {
  logger.info('server abruptly stopped')

  process.exit(0)
})