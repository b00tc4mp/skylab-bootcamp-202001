const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = token => {
  validate.string(token, 'token')

  return (async () => {
    const response = await fetch.get(`${API_URL}/credits/company`, { token })
    return await handleError(response)
  })()
}