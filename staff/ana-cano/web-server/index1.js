const http = require('http')
const fs = require('fs')
const logger = require('./logger')

const requestListener = (req, resp)=> {
    const rs = fs.createReadStream(`.${req.url === "/" ? "index.html": req.url}`)
    rs.on("data",content=>{
        resp.writeHead(200)
        resp.end(`${content}`)
    })
}


const server = http.createServer(requestListener);
server.listen(8080)