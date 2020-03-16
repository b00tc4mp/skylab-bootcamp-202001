const { User, Company } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = (companyId, { firstName }) => {

  validate.string(firstName, 'firstName')
  validate.length(firstName, 'firstName', 3, 30)

  // History of everything -- absolute control
  // Logins, new users, new payments, new credits, delete payments

  return (async () => {
    const company = await Company.findOne({ _id: companyId }).lean()
    if (!company) throw new Error('Company does not exist')

    const users = await User.find({ company: company._id })

    if (users.length >= 350) throw new Error('Maximum user limit')

    await User.create({ firstName, company: companyId })

  })
}