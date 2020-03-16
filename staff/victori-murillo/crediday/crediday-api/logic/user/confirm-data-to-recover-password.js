const { User } = require('crediday-models')
const validate = require('crediday-utils')
const randomNumber = require('crediday-utils/randomNumber')
const { env: { GMAIL, GMAIL_PASSWORD } } = process
const sendMail = require('crediday-utils/send-mail')
const template = require('./confirm-data-to-recover-password-template')

module.exports = async ({ company, email }) => {
  validate.string(company, 'company')
  validate.string(email, 'email')

  let user = await User.findOne({ email }).populate({ path: 'company', select: 'name' })

  if (!user) throw new Error('Ningún usuario tiene ese correo electrónico')
  if (user.company.name !== company) throw new Error('Nombre de compañia no coincide')

  user.verificationCode = randomNumber(6)
  user = await user.save()

  const authMail = { mail: GMAIL, password: GMAIL_PASSWORD }
  const to = email
  const subject = 'Código de Verificación - Nueva Contraseña'

  const html = template({
    company,
    username: user.username,
    code: user.verificationCode
  })

  const response = await sendMail({ authMail, to, subject, html })

  if (response instanceof Error) throw new Error(response.message)


  return 'Data confirmed'
}