const { validate, handleError, fetch } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = (companyId) => {
  validate.string(companyId, 'companyId')

  return (async () => {
    const response = await fetch.patch(`${API_URL}/companies/email/${companyId}`)
    return await handleError(response)
  })()
}