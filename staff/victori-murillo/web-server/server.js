const net = require('net')
const fs = require('fs')
const {WARN, ERROR, DEBUG} = require('./logger')

let connections = 0

const server = net.createServer(socket => {

    socket.on('data', chunk => {
      let response = chunk.toString()
      let routeServer = 'index.html'

      let route = response.split('/')[1].split(' ')[0].trim()
      if (route !== 'favicon.ico')
        DEBUG(`client tryed to access to: ./` + route)

      if (route === 'register.html' || route === 'register') {
        routeServer = route
      }  else if (route === 'login.html' || route === 'login'){
        routeServer = route
      } else if (route === 'index.html' || route === 'index' || !route.length) {
        routeServer = 'index.html'
      } else if (route !== 'favicon.ico') {
        WARN("./" + route)
      }

      if (!routeServer.includes('.html'))
        routeServer += '.html'

        fs.readFile(routeServer, (error, content) => { // WARN buffering
          if (error) ERROR(error)
          socket.end(`HTTP/1.1 200 OK\nServer: Cowboy\nAccess-Control-Allow-Origin: *\nConnections: ${++connections}\nContent-Type: text/html\n\n${content}\n`) // Content-Type: text/html
      })
    })
})

server.listen(8080, () => console.log('port 8080'))