const express = require('express')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
let path = require('path')
var users = require('./data')

const { argv: [ , , port = 8080]} = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(loggerMidWare)

// TRY this from CLI: $ curl http://localhost:8080/authenticate -X POST -d 'hola=mundo'
app.post('/authenticate', (req, res) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk
    })

    req.on('end', () => {
        // DO something with body (debug here, analise it, parse it... etc)

        console.log('body =>', body)

        res.end()
    })
})

logger.debug('setting up server')
app.listen(port, () => { logger.info(`Successfully connected to server on port ${port}`) })