const { Company, User } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = async (company) => {
  
  validate.string(company.name, 'name')
  validate.length(company.name, 3, 30)
  validate.string(user.username, 'username')
  validate.length(user.username, 3, 30)

  const companyFound = await Company.findOne({ name: company.name.toLowerCase() })
  if (companyFound) throw new Error('The company name is already taken')

  const userFound = await User.findOne({ username: user.username.toLowerCase() })
  if (userFound) throw new Error('The username is already taken')

  const newCompany = await Company.create({ name: company.name })

  const newUser = await User.create({
    username: user.username,
    firstName: user.username,
    company: newCompany.id,
    role: 'admin',
    password: '12345'
  })

  newCompany.users.push(newUser)
  await newCompany.save()
}