const net = require('net')
const fs = require('fs')
const logger = require('./logger')
​
​
​
const server = net.createServer(socket => {
    logger.info('starting server')
​
    logger.debug('setting encoding to utf8')
    socket.setEncoding('utf8')
    
    socket.on('data', chunk => {
        logger.info(`request received ${chunk} from ${socket.remoteAddress}`)
        const url = ((chunk.toString()).split('/')[1]).split(' ')[0]
        console.log(url)
        
        fs.readFile(`./${url}.html`, (err, data)=>{
            if(err) console.log(err)
            
            socket.end(`HTTP/1.1 200 OK\nServer: Cowboy\nAccess-Control-Allow-Origin: *\nContent-Type:text/html\n\n${data}\n`) 
        })
       
       
    })
    socket.on('error', error => logger.error(error))
})
server.listen(8080)
​
