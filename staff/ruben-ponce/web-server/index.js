const fs = require('fs')
const http = require('http')
const logger = require('./logger')

http.createServer( function (req, res) {
    let path = req.url.replace('/', '')
    logger.host = req.connection.remoteAddress
    path.includes('.html') ? path = path.replace('.html', '') : path = path
    
    logger.info('attempting to read file')

    fs.readFile(`${path}.html`, function (error, data) {
        if (error) {
            logger.warn(error.message)
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(error.message)
            return
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
}).listen(8080)