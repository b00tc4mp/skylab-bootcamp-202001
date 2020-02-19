const http = require('http')
const url = require('url')
const fs = require('fs')
const logger = require('./logger')
const PORT = 8080
const geolocation = require('./geolocation')
const axios = require("axios")

logger.info(`starting server ${PORT}`)

http.createServer((request, response) => {
  let {remoteAddress, remotePort} = request.connection
  remoteAddress = remoteAddress.split(':')[3]
  
  
  logger.ip = remoteAddress
  logger.port = remotePort

  // console.log(request)
  // console.log(request.connection.socket.remoteAddress)

  

  // axios(`http://api.ipstack.com/${remoteAddress}?access_key=3d9ebc5fefa0bf44d6abf75111f21a8b`)
  // .then(res => console.log(res))

  axios.get('https://api.ipify.org?format=json')
  .then(res => res.data.ip)
  .then(ip => {
    geolocation(ip, (error, data) => {
      logger.location = data
      console.log(data)
    })
  })

  logger.info(`request from`)

  const header = {'Content-Type': 'text/html'}
  let pathname = url.parse(request.url).pathname.substr(1)

  if (!pathname) pathname = 'index.html'
  if (!pathname.includes(".html")) pathname += '.html'

  fs.readFile(pathname, (err, data) => {
    if (err) {
      logger.warn(err)
      response.writeHead(404, header)
    } else {
      response.writeHead(200, header)
      response.write(data.toString())
    }

    response.end()
  })

}).listen(PORT, () => console.log(`port on ${PORT}`))