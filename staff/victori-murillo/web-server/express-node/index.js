const express = require('express')
const app = express()
const fs = require('fs')
const PORT = 8080;

app.all('*', (req, res) => {
  fs.readFile
})

app.listen(PORT, () => console.log(`running on port ${PORT}`))