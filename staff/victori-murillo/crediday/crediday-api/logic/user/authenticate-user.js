const { User } = require('crediday-models')
const validate = require('crediday-utils')
const { compare } = require('bcryptjs')

module.exports = async ({ username, password }) => {
  validate.string(username, 'username')
  validate.string(password, 'password')

  const user = await User
    .findOne({ username: username.toLowerCase() })
    .populate({ path: 'company', select: 'emailConfirmation' })

  if (!user) throw new Error('Credenciales incorrectas')
  if (!user.company.emailConfirmation) throw new Error('Confirma tu correo electrónico')

  const validPassword = await compare(password, user.password)

  if (!validPassword) throw new Error('Credenciales incorrectas')

  user.authenticatedDates.push(new Date)

  const { id, company } = await user.save()

  return {
    sub: id,
    com: company
  }
}