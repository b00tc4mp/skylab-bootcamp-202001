const express = require('express')
const api = require('./routes/api')
const app = express()
const PORT = 8080

app.use("/", api)

app.listen(PORT, () => console.log(`Running on port ${PORT}`))