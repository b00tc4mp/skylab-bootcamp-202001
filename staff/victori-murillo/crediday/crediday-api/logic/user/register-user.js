const { User, Company } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = async ({ sub, com }, body) => {
  const { firstName } = body

  validate.string(firstName, 'firstName')
  validate.length(firstName, 'firstName', 3, 30)

  // History of everything -- absolute control
  // Logins, new users, new payments, new credits, delete payments

  // TODO --> LIMIT users

  const { users } = await Company.findOne({ _id: com }).lean()
  if (users.length >= 350) throw new Error('Maximum user limit')

  const newUser = await User.create({ ...body, company: com })

  const companyFound = await Company.findOne({ _id: com })
  companyFound.users.push(newUser._id)
  await companyFound.save()
}