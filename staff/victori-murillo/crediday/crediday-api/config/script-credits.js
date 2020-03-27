require('dotenv').config()
const { env: { MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { registerUser } = require('../logic')

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    users.forEach(async (user, index) => {
      await registerUser('5e7d7eb8b5a8ad57b78f40f7', { firstName: user })
      if (users.length - 1 === index) mongoose.disconnect()
    })
  })
  .catch(error => console.log("script users didn't work", error.message))