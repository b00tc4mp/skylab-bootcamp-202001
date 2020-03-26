const { NotAllowedError } = require('crediday-errors')
const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = ({ username, password }) => {
  validate.string(username, 'username')
  validate.string(password, 'password')

  return (async () => {
    const response = await fetch.post(`${API_URL}/users/auth`, {
      body: { username, password }
    })
    return await handleError(response)
  })()
}