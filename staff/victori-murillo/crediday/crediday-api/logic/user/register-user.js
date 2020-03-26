const { User, Company } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = (userId, body) => {
  validate.string(userId, 'userId')
  validate.string(body.firstName, 'firstName')
  validate.length(body.firstName, 'firstName', 3, 30)

  body.firstName = body.firstName.split(' ').map(string => {
    return string.trim()[0].toUpperCase() + string.trim().slice(1).toLowerCase()
  }).join(' ')

  // History of everything -- absolute control
  // Logins, new users, new payments, new credits, delete payments

  return (async () => {
    const user = await User.findOne({ _id: userId })

    const company = await Company.findOne({ _id: user.company })
    if (!company) throw new Error('Company does not exist')

    const users = await User.find({ company: company._id })

    if (users.length >= 350) throw new Error('Maximum user limit')

    await User.create({ ...body, company: user.company })
  })()
}