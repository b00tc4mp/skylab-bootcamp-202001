require('dotenv').config({ path: './.env' })
const { Company, User } = require('crediday-models')
const validate = require('crediday-utils')
const sendMail = require('crediday-utils/send-mail')
const { hash } = require('bcryptjs')
const { env: { PASSWORD, GMAIL, GMAIL_PASSWORD, FROM_MAIL } } = process

module.exports = async ({ companyName, username }) => {
  debugger
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

  const response = await sendMail(
    {
      mail: 'victori.developer@gmail.com',
      password: GMAIL_PASSWORD
    }, 
    newCompany.name, newUser.username, PASSWORD)
    
  if (response instanceof Error) throw new Error(response.message)
}