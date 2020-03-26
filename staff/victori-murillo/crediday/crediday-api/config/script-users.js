require('dotenv').config()
const { env: { MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { registerUser } = require('../logic')

let users = []

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    let count = 0
    let result = ''
    const characters = 'bcdfghjklmnpqrstvwxyz'
    const vowels = 'aeiou'

    while (count < 30) {
      for (var i = 0; i < 3; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        result += vowels.charAt(Math.floor(Math.random() * vowels.length));
      }
      users.push(result)
      count++
      console.log(result)
      result = ''
    }
    
  })
  .then(() => {
    users.forEach(async (user, index) => {
      await registerUser('5e7c2d4ce04a44926dc90cba', { firstName: user })

      if (users.length - 1 === index) mongoose.disconnect()
    })
  })






