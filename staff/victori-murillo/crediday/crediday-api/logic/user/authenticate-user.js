const { User } = require('crediday-models')
const { validate, bcrypt: { compare } } = require('crediday-utils')

module.exports = ({ username, password }) => {
  validate.string(username, 'username')
  validate.string(password, 'password')

  return (async () => {
    const user = await User
      .findOne({ username: username.toLowerCase() })
      .populate({ path: 'company', select: 'emailConfirmation' })

    if (!user) throw new Error('Credenciales incorrectas')
    if (!user.company.emailConfirmation) throw new Error('Confirma tu correo electrónico')

    const validPassword = await compare(password, user.password)

    if (!validPassword) throw new Error('Credenciales incorrectas')

    user.authenticatedDates.push(new Date)

    const { id } = await user.save()
    return id
  })()

}