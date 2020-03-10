// import { validate } from 'events-utils'
// import { NotAllowedError } from 'events-errors'

const API_URL = process.env.REACT_APP_API_URL


export default async ({username, password}) => {
  
  // validate.string(username, 'username')
  // validate.string(password, 'password')

  const response = await fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  const { status } = response

  if (status === 200) {
    const { token } = await response.json()
    return token
  }

  if (status >= 400 && status < 500) {
    const { error } = await response.json()

    if (status === 401) {
      // throw new NotAllowedError(error)
      throw new Error(error)
    }

    throw new Error(error)
  }

  throw new Error('server error')

}