const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

/**
 * @function Function to confirm verification code
 * @param  {Object} object {code, email}
 * @throws {Error} if someone is wrong in the response
 * @return {Promise}
 */

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