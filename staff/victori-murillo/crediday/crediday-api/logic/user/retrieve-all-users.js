const { User, Company } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = async (companyId) => {
  validate.string(companyId, 'company')

  console.log(companyId)

  let users = await User.find({ company: companyId }).lean()

  if (!users) throw new Error('Something wrong finding users from the company')

  users.forEach(user => {
    user.id = user._id.toString()
    delete user._id
  })

  return users
}