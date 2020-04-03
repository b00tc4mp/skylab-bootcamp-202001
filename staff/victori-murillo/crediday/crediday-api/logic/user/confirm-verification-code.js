const { User } = require('crediday-models')
const { validate } = require('crediday-utils')

/**
 * @function Function to confirm verification code 
 * @param  {object} object user's properties (code, email)
 * @throws {Error} (email || company) not exists
 * @return {Promise<undefined>} undefined
 */

module.exports = ({ code, email }) => {
  validate.string(code, 'code')
  validate.string(email, 'email')
  validate.email(email)

  return (async () => {
    let user = await User.findOne({ email })
    if (!user) throw new Error('Ningún usuario tiene ese correo electrónico')
    if (user.verificationCode !== code) throw new Error('Código incorrecto')
  })()
}