require('dotenv').config()
const { Company, User } = require('crediday-models')
const validate = require('crediday-utils')
const { hash } = require('bcryptjs')
const { env: { PASSWORD } } = process

module.exports = async ({ companyName, username }) => {
  // TO DO --> Improve with destructuring
  // TO DO --> validate with destructuring and every single key
  
  validate.string(companyName, 'companyName')
  validate.length(companyName, 'companyName', 3, 20)

  validate.string(username, 'username')
  validate.length(username, 'username', 3, 30)

  validate.string(PASSWORD, 'password')
  validate.length(PASSWORD, 'password', 5, 30)

  const companyFound = await Company.findOne({ name: companyName.toLowerCase() })
  if (companyFound) throw new Error('The company name is already taken')

  const userFound = await User.findOne({ username: username.toLowerCase() })
  if (userFound) throw new Error('The username is already taken')

  const newCompany = await Company.create({ name: companyName.toLowerCase() })

  const newUser = await User.create({
    username: username,
    firstName: username,
    company: newCompany.id,
    role: 'owner',
    password: await hash(PASSWORD, 10)
  })

  const confirmUser = await User.findOne({ _id: newUser._id })
  if (!confirmUser) throw new Error('User was not created')

  // newCompany.users.push(newUser.id)
  // await newCompany.save()
}