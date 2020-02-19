const http = require('http')
const fs = require('fs')

const logger = require('./logger')


const server = http.createServer((request,response)=> {
    logger.info('starting server')
    logger.debug('setting encoding to utf8')

    const ip = request.socket.remoteAddress
    logger.info('IP: ' + ip )

    let path = req.url
    if(path === '/') path += 'index.html'
    path = `.${path}`;

    let rs = fs.createReadStream(path)
    response.setHeader('Content-Type','text/html')

    /* rs.on('data', chunk => {res.write(chunk)})
    rs.on('end', ()=> res.end()) */
    
    //con pipe 
    rs.pipe(response)

    rs.on('error', error => {
        logger.warn(error)
        res.writeHead(404)
        return res.end('<h1>Not Found</h1>');
    })
    response.on('error', error => logger.error(error))

    /* fs.readFile(path, function(error, html){
        if(error) {
            res.writeHead(404);
            return response.end('404 Not Found');
        }
        res.setHeader(200, {'Content-Type':'text/html'});
        res.write(html);
        response.end()
     
    }) */
})
server.listen(8000)

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    setTimeout(() => process.exit(0), 1000)
})