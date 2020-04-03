const { User } = require('crediday-models')
const { validate } = require('crediday-utils')

/**
 * @function Function to retrieve a user
 * @param  {string} string user id
 * @throws {Error} users not exists
 * @return {Promise<Object>} user
 */

module.exports = (id) => {
  validate.string(id, 'id')

  return (async () => {
    const userFound = await User.findOne({ _id: id }).populate({ path: 'company', select: 'name' }).lean()
    if (!userFound) throw new Error('User not exists')

    userFound.id = userFound._id.toString()
    delete userFound._id
    delete userFound.password

    return userFound
  })()
}