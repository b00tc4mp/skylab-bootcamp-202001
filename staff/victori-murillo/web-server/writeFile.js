const fs = require('fs')

function write(data) {
  fs.writeFile('server.log', `${data}\n`, {flag: "a"}, err => {
    if (err) throw err
    console.log(`Data: ${data} saved`)
  })
}

module.exports = write