const fs = require('fs')
const http = require('http')
const logger = require('./logger')

http.createServer( function (req, res) {
    let path = req.url.replace('/', '')
    path.includes('.html') ? path = path.replace('.html', '') : path = path
    
    fs.readFile(`${path}.html`, function (error, data) {
        if (error) logger.warn(error.message)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
}).listen(8080)