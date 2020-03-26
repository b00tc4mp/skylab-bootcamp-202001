const { Company, User } = require('crediday-models')
const { validate, sendMail, bcrypt: { hash } } = require('crediday-utils')
const { env: { GMAIL, GMAIL_PASSWORD } } = process
const template = require('./confirm-template')

module.exports = async ({ companyName, username, email, password }) => {

  validate.string(companyName, 'Nombre de Compañia')
  validate.length(companyName, 'Nombre de Compañia', 3, 20)

  validate.string(username, 'Nombre de Usuario')
  validate.length(username, 'Nombre de Usuario', 3, 30)

  validate.string(password, 'password')
  validate.length(password, 'password', 3, 30);

  return (async () => {
    const companyFound = await Company.findOne({ name: companyName.toLowerCase() })
    if (companyFound) throw new Error('El nombre de Compañia ya existe')

    const userFound = await User.findOne({ username: username.toLowerCase() })
    if (userFound) throw new Error('El nombre de Usuario ya existe')

    if (await User.findOne({ email })) throw new Error('Correo ya existe')

    const newCompany = await Company.create({ name: companyName.toLowerCase() })

    const firstName = username.slice(0, 1).toUpperCase() + username.slice(1).toLowerCase()

    const newUser = await User.create({
      username: username,
      firstName,
      email,
      password: await hash(password, 10),
      role: 'owner',
      company: newCompany.id,
    })

    const confirmUser = await User.findOne({ _id: newUser._id })
    if (!confirmUser) throw new Error('User was not created')

    const html = template({
      company: newCompany.name,
      username: newUser.username,
      companyId: newCompany.id
    })

    const subject = 'Confirmación de registro en CrediDay App'

    const authMail = {
      mail: GMAIL,
      password: GMAIL_PASSWORD
    }
    const response = await sendMail({ authMail, to: email, html, subject })

    if (response instanceof Error) throw new Error(response.message)

    return email

  })()

}