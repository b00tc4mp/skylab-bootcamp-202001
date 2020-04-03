const { validate, handleError, fetch } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

/**
 * @function Function to confirm company
 * @param  {string} string company id
 * @throws {Error} if someone is wrong in the response
 * @return {Promise<undefined>} undefined
 */

module.exports = (companyId) => {
  validate.string(companyId, 'companyId')

  return (async () => {
    const response = await fetch.patch(`${API_URL}/companies/email/${companyId}`)
    return await handleError(response)
  })()
}