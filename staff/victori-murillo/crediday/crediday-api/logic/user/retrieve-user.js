const { User } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = (id) => {
  validate.string(id, 'id')

  return (async () => {
    const userFound = await User.findOne({ id }).lean()
    if (!userFound) throw new Error('Not Found')

    return userFound
  })
}