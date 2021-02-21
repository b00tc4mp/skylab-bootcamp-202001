const { Credit } = require('crediday-models')
const { validate } = require('crediday-utils')

/**
 * @function Function to get all credits by User
 * @param  {string} userId credit's unique id
 * @throws {Error} if the credits not found 
 * @return {Promise<Array>} credits
 */

module.exports = userId => {
  validate.string(userId, 'userId')

  return (async () => {
    let credits = await Credit.find({ user: userId }).lean()

    if (!credits.length) throw new Error('Credits not Found')

    credits.forEach(credit => {
      credit.id = credit._id.toString()
      delete credit._id
    })

    return credits
  })()
}