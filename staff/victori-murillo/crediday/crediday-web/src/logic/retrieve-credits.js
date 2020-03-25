import validate from 'crediday-utils'
import { NotAllowedError } from 'crediday-errors'
const API_URL = process.env.REACT_APP_API_URL

export default async (token) => {
  validate.string(token, 'token')

  const response = await fetch(`${API_URL}/credits/company`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const { status } = response

  if (status === 200) {
    const { credits } = await response.json()
    return credits
  }

  if (status >= 400 && status < 500) {
    const { error } = await response.json()

    if (status === 401) {
      throw new NotAllowedError(error)
    }

    throw new Error(error)
  }

  throw new Error('server error')

}