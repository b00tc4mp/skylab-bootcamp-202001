const express = require('express')
const api = require('./routes/api')
const app = express()
const bodyParser = require('./middleware/body-parser')
const logger = require('./utils/logger')

const PORT = 8080

app.use(bodyParser)
app.use("/", api)

app.listen(PORT, () => console.log(`Running on port ${PORT}`))