require('dotenv').config({ path: './.env' })
const { Company, User } = require('crediday-models')
const validate = require('crediday-utils')
const sendMail = require('crediday-utils/send-mail')
const { hash } = require('bcryptjs')
const { env: { GMAIL, GMAIL_PASSWORD } } = process
const template = require('./confirm-template')

module.exports = async ({ companyName, username, email, password }) => {
  // TO DO --> Improve with destructuring
  // TO DO --> validate with destructuring and every single key

  debugger

  validate.string(companyName, 'Nombre de Compañia')
  validate.length(companyName, 'Nombre de Compañia', 3, 20)

  validate.string(username, 'Nombre de Usuario')
  validate.length(username, 'Nombre de Usuario', 3, 30)

  validate.string(password, 'password')
  validate.length(password, 'password', 3, 30)

  const companyFound = await Company.findOne({ name: companyName.toLowerCase() })
  if (companyFound) throw new Error('El nombre de Compañia ya existe')

  const userFound = await User.findOne({ username: username.toLowerCase() })
  if (userFound) throw new Error('El nombre de Usuario ya existe')

  const newCompany = await Company.create({ name: companyName.toLowerCase() })

  const newUser = await User.create({
    username: username,
    firstName: username,
    email,
    password: await hash(password, 10),
    role: 'owner',
    company: newCompany.id,
  })

  const confirmUser = await User.findOne({ _id: newUser._id })
  if (!confirmUser) throw new Error('User was not created')

  // let html = `<div style="display:flex;">
  // <p>Nombre de la compañia: ${newCompany.name}</p>
  // <p>Nombre del usuario: ${newUser.username}</p>
  // <a href="http://localhost:3000/login/${newCompany.id}" target="_blank" >
  //   <button>Click para confirmar tu Compañia</button>
  // </a>
  // </div>`

  const html = template({
    company: newCompany.name,
    username: newUser.username,
    companyId: newCompany.id
  })

  const response = await sendMail({ mail: GMAIL, password: GMAIL_PASSWORD }, email, html)

  if (response instanceof Error) throw new Error(response.message)

  return email
}