const { Credit, User } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = userId => {
  validate.string(userId, 'userId')

  return (async () => {

    let user = await User.findById(userId) 
    if (!user) throw new Error('User not Found')

    let credits = await Credit.find({ company: user.company }).populate({path: 'user', select: 'firstName'}).lean()

    if (!credits.length) throw new Error('Credits not Found')

    credits.forEach(credit => {
      credit.firstName = credit.user.firstName
      delete credit.user
      credit.id = credit._id.toString()
      delete credit._id
    })

    return credits
  })()
}