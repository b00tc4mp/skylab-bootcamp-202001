import validate from 'crediday-utils'
// import { NotAllowedError } from 'events-errors'
const API_URL = process.env.REACT_APP_API_URL

export default async ({ firstName }) => {
  validate.string(firstName, 'Nombre')
  // validate.string(username, 'Nombre de Usuario')
  // validate.string(email, 'Correo electónico')
  // validate.email(email)
  // validate.string(password, 'Contraseña')
  // validate.string(passwordValidation, 'Confirmación de Contraseña ')

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.session}`
     },
    body: JSON.stringify({ firstName })
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