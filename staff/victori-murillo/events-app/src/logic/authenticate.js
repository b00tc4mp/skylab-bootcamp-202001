import { validate } from 'events-utils'
const { env: { REACT_APP_API_URL: API_URL } } = process

export default async (username, password) => {
  validate.string(username)
  validate.string(password)

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  console.log(response)
  debugger
  // if (error) return callback(error)

  // const { error: _error, token } = JSON.parse(response.content)

  // if (_error) return callback(new Error(_error))

  // callback(undefined, token)
}