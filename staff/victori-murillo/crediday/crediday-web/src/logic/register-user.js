const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = ({ firstName, token }) => {
  validate.string(firstName, 'Nombre')

  return (async () => {
    const response = await fetch.post(`${API_URL}/users`, { token, body: { firstName } })
    return await handleError(response)
  })()
}