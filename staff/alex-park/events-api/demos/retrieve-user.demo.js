const { retrieveUser, authenticateUser } = require('../logic')
authenticateUser('pepitazo@gmail.com', '123')
.then(token => retrieveUser(token))
.then(user => console.log(user))