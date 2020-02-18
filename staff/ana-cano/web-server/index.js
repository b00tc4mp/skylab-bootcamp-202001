const net = require('net')
var fs = require('fs')

const server = net.createServer(socket => {

    socket.on('data', chunk => {
        let path = chunk.toString().split("/")[1].split(' ')[0]

        if(!path) path='index.html'

        const rs = fs.createReadStream(`./${path}`)

        if(path !== "favicon.ico"){
            console.log(path)
            rs.on('data', content => {
                socket.end(`HTTP/1.1 200 OK\nServer: Cowboy\nAccess-Control-Allow-Origin:\nContent-Type: text/html\n\n${content}\n`)
            })

            rs.on('error', error => {
                socket.end(`HTTP/1.1 404\n\nnot found`)
            })

        }else {

        }

        // Content-Type: text/html
        //socket.end(`HTTP/1.1 404
        //Content-Type: text/html
        
        
//<h1>Not found</h1>

    })
})

server.listen(8080)