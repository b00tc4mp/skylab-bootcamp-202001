const { User, Payment } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = userId => {
  validate.string(userId, 'userId')

  return (async () => {

    let user = await User.findById(userId)
    if (!user) throw new Error('User not Found')

    let payments = await Payment.find({ company: user.company })

    return payments
  })()
}