const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = ({ code, email, password, passwordAgain }) => {
  validate.string(code, 'Código')
  code = code.trim().toLowerCase()
  validate.length(code, 'Código incorrecto', 6, 6, true)

  validate.string(password, 'Contraseña')
  password = password.trim().toLowerCase()

  validate.string(passwordAgain, 'Contraseña 2')
  passwordAgain = passwordAgain.trim().toLowerCase()

  validate.string(email, 'email')
  email = email.trim().toLowerCase()
  validate.email(email)

  if (password !== passwordAgain) throw new Error('Contraseñas no coinciden')

  return (async () => {
    const response = await fetch.patch(`${API_URL}/users/update-password`, { body: { code, email, password } })
    return await handleError(response)
  })()
}