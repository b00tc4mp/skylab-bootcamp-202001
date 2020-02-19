const http = require('http')
const fs = require('fs')
const url = require('url')
const logger = require('./logger')


const server = http.createServer((req,res)=> {
    logger.info('starting server')
    logger.debug('setting encoding to utf8')

    const ip = req.socket.remoteAddress
    logger.info('IP: ' + ip )

    let q = url.parse(req.url, true);
    let filename = '.' + q.pathname;
    if(filename === './') filename = 'index.html'

    fs.readFile(filename, function(error, html){
        if(error) {
            //res.writeHead(404,{'Content-Type': 'type/html'});
            return res.end('404 Not Found');
        }
        //res.writeHead(200, {'Content-Type':'text/html'});
        res.write(html);
        res.end()
     
    })
})
server.listen(8000)