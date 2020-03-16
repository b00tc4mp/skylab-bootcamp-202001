const { User } = require('crediday-models')
const validate = require('crediday-utils')
const { hash, compare } = require('bcryptjs')

module.exports = ({ code, email, password }) => {
  validate.string(code, 'code')
  validate.string(email, 'email')
  validate.email(email)
  validate.string(password, 'password')


  return (async () => {
    let user = await User.findOne({ email })

    if (!user) throw new Error('Ningún usuario tiene ese correo electrónico')
    if (user.verificationCode !== code) throw new Error('Código incorrecto')

    user.verificationCode = ''
    user.password = await hash(password, 10)

    user = await user.save()

    if (user.verificationCode !== '') throw new Error('Left remove the verfication code')

    return 'Contraseña actualizada'
  })
}