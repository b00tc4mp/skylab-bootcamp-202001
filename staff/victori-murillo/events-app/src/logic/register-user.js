import { validate } from 'events-utils'
const { env: { REACT_APP_API_URL: API_URL } } = process

export default async (name, surname, email, password) => {
  validate.string(name, 'name')
  validate.string(surname, 'surname')
  validate.string(email, 'email')
  validate.email(email)
  validate.string(password, 'password')

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, surname, email, password })
  })

  if (response.status === 201) return

  if (response.status === 409) {

    const responseObj = await response.json()

    const { error } = responseObj
    throw new Error(error)

  } else {
    throw new Error('Unkown error')
  }
}