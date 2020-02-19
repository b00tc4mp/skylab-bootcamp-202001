const express = require('express')
const logger = require('./utils/logger')

const app = express()

app.use(express.static('public'));
app.use(express.static('utils'));
  
app.listen(8080, function () {
    logger.info('Listening on port 8080!');
});