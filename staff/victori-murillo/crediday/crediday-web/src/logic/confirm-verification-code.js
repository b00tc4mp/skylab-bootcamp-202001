const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = ({ code, email }) => {
  validate.string(code, 'Código')
  code = code.trim().toLowerCase()
  validate.length(code, 'Código incorrecto', 6, 6, true)

  validate.string(email, 'email')
  email = email.trim().toLowerCase()
  validate.email(email)

  return (async () => {
    const response = await fetch.patch(`${API_URL}/users/confirm-verification-code`, {
      body: { code, email }
    })
    return await handleError(response)
  })()
}