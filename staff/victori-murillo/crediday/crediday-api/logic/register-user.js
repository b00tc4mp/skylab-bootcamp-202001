const { User } = require('../models')
const validate = require('../utils/validate')

module.exports = async ({ name }) => {

  validate.string(name, 'name')

  await User.create({ name })
}