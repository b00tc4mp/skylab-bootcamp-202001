require('dotenv').config()
const { env: { MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { registerUser } = require('../logic')

let users = ['jennifer alpizar valenciano', 'dora mora chaves', 'beatriz reyes centeno',
'carlos campos rojas', 'mario alberto barrantes', 'juan carlos mora mora', 'stiven uribe soto',
'jose pablo gonzalez', 'carmen vega soto', 'jose antonio rojas', 'estrella chaves barrantes', 
'rosa cano pavon', 'jose joaquin', 'jose daniel alvarado', 'luis emilio alpizar rojas',
'Joseph Alvarado alvarado', 'cristian rodriguez', 'alex green wright', 'nataly alpizar valenciano',
'randy steven tapia mora', 'irene villalobos mora']

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    users.forEach(async (user, index) => {
      await registerUser('5e7d9ffcc9f9df92f4465e2c', { firstName: user })
      if (users.length - 1 === index) mongoose.disconnect()
    })
  })
  .catch(error => console.log("script users didn't work", error.message))