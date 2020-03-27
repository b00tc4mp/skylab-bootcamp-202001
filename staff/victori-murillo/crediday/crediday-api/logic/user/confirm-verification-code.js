const { User } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = ({ code, email }) => {
  validate.string(code, 'code')
  validate.string(email, 'email')
  validate.email(email)

  return (async () => {
    let user = await User.findOne({ email })
    if (!user) throw new Error('Ningún usuario tiene ese correo electrónico')
    if (user.verificationCode !== code) throw new Error('Código incorrecto')

    // user.verificationCode = ''
    // user = await user.save()
    // if (user.verificationCode !== '') throw new Error('Left remove the verfication code')
  })()
}