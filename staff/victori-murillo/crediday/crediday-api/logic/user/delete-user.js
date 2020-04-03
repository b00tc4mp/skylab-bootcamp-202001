const { User } = require('crediday-models')
const { validate } = require('crediday-utils')

/**
 * @function Function to delete user
 * @param  {string} string user id
 * @throws {Error} user not exists
 * @return {Promise<undefined>} undefined
 */

module.exports = _id => {
  validate.string(_id, 'id')

  return (async () => {
    const user = await User.findOne({ _id }).lean()
    if (!user) throw new Error(`User does not exist to delete it`)

    await User.deleteOne({ _id })
  })()
}