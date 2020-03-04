const { validate } = require('events-utils')
const { User } = require("events-models")

module.exports = (name, surname, email, password) => {

  validate.string(name, 'name')
  validate.string(surname, 'surname')
  validate.string(email, 'email')
  validate.email(email)
  validate.string(password, 'password')


  return User.findOne({ email })
    .then(user => {
      if (user) throw new Error(`user with email ${email} already exists`)

      return User.create({ name, surname, email, password })
        .then(() => { })
    })
}