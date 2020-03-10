const { User, Company } = require('../../models')
const validate = require('../../utils/validate')

module.exports = async (companyId) => {
  validate.string(companyId, 'company')

  // let users = await User.find({ company: companyId }).lean()
  let {users} = await Company.findOne({ _id: companyId }).populate({path: 'users', select: 'firstName'}).lean()
  console.log(users)

  if (!users.length) throw new Error('Not Found')

  users.forEach(user => {
    user.id = user._id.toString()
    delete user._id
  })

  console.log(users)

  return users
}