import validate from 'crediday-utils'
// import { NotAllowedError } from 'events-errors'
const API_URL = process.env.REACT_APP_API_URL

export default async ({ companyName, username, email, password, passwordValidation }) => {
  validate.string(companyName, 'Nombre de Compañia')
  validate.string(username, 'Nombre de Usuario')
  validate.string(email, 'Correo electónico')
  validate.email(email)
  validate.string(password, 'Contraseña')
  validate.string(passwordValidation, 'Confirmación de Contraseña ')

  if (password !== passwordValidation) throw new Error('Las constraseñas deben coincidir')

  const response = await fetch(`${API_URL}/companies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ companyName, username, email, password })
  })

  const { status } = response

  if (status === 201) {
    const { email } = await response.json()
    return email
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