const { registerUser } = require('../logic')

registerUser('Pepitazo', 'Grillazo', 'pepito@oso.com', '123')
.then(() => console.log('registered'))
.catch(error => console.error(error.message))