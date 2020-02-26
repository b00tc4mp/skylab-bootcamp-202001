require('dotenv').config()

const { authenticateUser } = require('../logic')

authenticateUser('osopardo@oso.es', '123')
.then(token => console.log(token))
.catch(error => console.error(error.message))