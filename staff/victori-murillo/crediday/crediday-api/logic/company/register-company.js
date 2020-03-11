require('dotenv').config()
const { Company, User } = require('crediday-models')
const validate = require('crediday-utils')
const { hash } = require('bcryptjs')
const { env: { PASSWORD } } = process

module.exports = async ({ company, user }) => {
  validate.string(company.name, 'name')
  validate.length(company.name, 'company', 3, 20)

  validate.string(user.username, 'username')
  validate.length(user.username, 'username', 3, 30)

  validate.string(PASSWORD, 'password')
  validate.length(PASSWORD, 'password', 5, 30)

  const companyFound = await Company.findOne({ name: company.name.toLowerCase() })
  if (companyFound) throw new Error('The company name is already taken')

  const userFound = await User.findOne({ username: user.username.toLowerCase() })
  if (userFound) throw new Error('The username is already taken')

  const newCompany = await Company.create(company)

  const newUser = await User.create({
    username: user.username,
    firstName: user.username,
    company: newCompany.id,
    role: 'owner',
    password: await hash(PASSWORD, 10)
  })

  newCompany.users.push(newUser.id)
  await newCompany.save()
}