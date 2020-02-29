const { registerUser } = require('../logic')

registerUser('rpc', 'rpc', 'rpc@gmail.com', '123')
    .then(() => console.log('registered'))
    .catch(error => console.error(error))