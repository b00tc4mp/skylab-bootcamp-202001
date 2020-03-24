import validate from 'crediday-utils'
import { NotAllowedError } from 'crediday-errors'
const API_URL = process.env.REACT_APP_API_URL

export default async ({code, email, password, passwordAgain}) => {

  validate.string(code, 'Código')
  code = code.trim().toLowerCase()
  validate.length(code, 'Código incorrecto', 6, 6, true)

  validate.string(password, 'Contraseña')
  password = password.trim().toLowerCase()

  validate.string(passwordAgain, 'Contraseña 2')
  passwordAgain = passwordAgain.trim().toLowerCase()

  validate.string(email, 'email')
  email = email.trim().toLowerCase()
  validate.email(email)

  if (password !== passwordAgain) throw new Error('Contraseñas no coinciden')

  const response = await fetch(`${API_URL}/users/update-password`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, email, password })
  })

  const { status } = response

  if (status === 200) {
    const { message } = await response.json()
    return message
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