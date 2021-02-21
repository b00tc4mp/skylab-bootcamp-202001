const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

/**
 * @function Function to confirm data
 * @param  {Object} object {companyName, email}
 * @throws {Error} if someone is wrong in the response
 * @return {Promise<undefined>} undefined
 */

module.exports = ({ company, email }) => {

  validate.string(company, 'Nombre de Compañia')
  company = company.trim().toLowerCase()
  validate.length(company, 'Nombre de Compañia', 3, 30)

  validate.string(email, 'email')
  email = email.trim().toLowerCase()
  validate.email(email)

  return (async () => {
    const response = await fetch.patch(`${API_URL}/users/confirm-data`, { body: { company, email } })
    return await handleError(response)
  })()
}