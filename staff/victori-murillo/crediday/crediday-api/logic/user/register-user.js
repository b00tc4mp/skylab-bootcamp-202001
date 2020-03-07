const { User } = require('../../models')
const validate = require('../../utils/validate')

module.exports = async (user) => {
  const {firstName} = user

  validate.string(firstName, 'firstName')
  validate.length(firstName, 3, 30)

  await User.create(user)
}