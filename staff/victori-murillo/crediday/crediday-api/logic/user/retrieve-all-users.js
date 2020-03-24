const { User } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = (userId) => {
  console.log(userId)
  validate.string(userId, 'userId');

  return (async () => {
    console.log('retrieve all')
    let user = await User.findOne({ _id: userId })
    let users = await User.find({company: user.company}).lean()

    if (!users) throw new Error('Something wrong finding users from the company')

    users.forEach(user => {
      user.id = user._id.toString()
      delete user._id
      delete user.password
      delete user.company
    })

    return users
  })()
}