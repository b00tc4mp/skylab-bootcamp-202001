const { Credit, User } = require('crediday-models')
const { validate } = require('crediday-utils')

/**
 * @function Function to get all credits by Company
 * @param  {string} userId credit's unique id
 * @throws {Error} if the user not found 
 * @return {Promise<Array>} credits
 */

module.exports = userId => {
  validate.string(userId, 'userId')

  return (async () => {

    let user = await User.findById(userId)
    if (!user) throw new Error('User not Found')

    let credits = await Credit.find({ company: user.company }).populate({ path: 'user', select: 'firstName' }).lean()

    credits.forEach(credit => {
      credit.firstName = credit.user.firstName
      delete credit.user
      credit.id = credit._id.toString()
      delete credit._id
    })

    return credits
  })()
}