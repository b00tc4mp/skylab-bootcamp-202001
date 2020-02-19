
const express = require('express')
const app = express()
const logger = require('./utils/logger')

app.use(express.static('public'))
app.use(logger)


app.listen(8000, () =>{
    logger.info('Success')
})
