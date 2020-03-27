const { User } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = (id) => {
  validate.string(id, 'id')

  return (async () => {
    const userFound = await User.findOne({ _id: id }).populate({ path: 'company', select: 'name' }).lean()
    if (!userFound) throw new Error('Not Found')

    userFound.id = userFound._id.toString()
    delete userFound._id
    delete userFound.password

    return userFound
  })()
}