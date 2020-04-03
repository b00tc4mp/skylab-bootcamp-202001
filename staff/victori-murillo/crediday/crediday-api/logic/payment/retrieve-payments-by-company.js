const { User, Payment } = require('crediday-models')
const { validate } = require('crediday-utils')

/**
 * @function Function to get a payment
 * @param  {string} userId user id
 * @throws {Error} if the user not found 
 * @return {Promise<Array>} payments
 */

module.exports = userId => {
  validate.string(userId, 'userId')

  return (async () => {

    let user = await User.findById(userId)
    if (!user) throw new Error('User not Found')

    // let payments = await Payment.find({ company: user.company }).populate({ path: 'credit', populate: { path: 'user' } }).lean()
    let payments = await Payment.find({ company: user.company }).populate({ path: 'credit', populate: { path: 'user' } })

    // Sometimes populate and lean dont work together
    payments.forEach(pay => {
      pay.id = pay._id.toString()
      delete pay._id

      pay.credit.id = pay.credit._id.toString()
      delete pay.credit._id

      pay.credit.user.id = pay.credit.user._id.toString()
      delete pay.credit.user._id
    })

    return payments
  })()
}