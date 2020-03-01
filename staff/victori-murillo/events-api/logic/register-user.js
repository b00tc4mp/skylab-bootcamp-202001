const {validate} = require('../utils')
const { database, models: {User} } = require('../data')

module.exports = (name, surname, email, password) => {

  validate.string(name, 'name')
  validate.string(surname, 'surname')
  validate.string(email, 'email')
  validate.email(email)
  validate.string(password, 'password')

  const users = database.collection('users')

  return users.findOne({email})
    .then(user => {
      if(user) throw new Error(`user with email ${email} already exists`)

      return users.insertOne( new User({ name, surname, email, password }) )
    })
    .then(()=>{})
}