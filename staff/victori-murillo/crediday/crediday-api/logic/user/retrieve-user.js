const { User } = require('../../models')
const validate = require('../../utils/validate')

module.exports = async (id) => {
  validate.string(id, 'id')

  const userFound = await User.findOne({ id }).lean()
  if (!userFound) throw new Error('Not Found')

  return userFound
}