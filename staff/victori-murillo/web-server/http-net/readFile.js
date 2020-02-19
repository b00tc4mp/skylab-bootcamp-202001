const fs = require('fs')

fs.readFile('./index.html', 'utf8', (error, data) => {
  console.log(data)
  console.log(data.toString())
})