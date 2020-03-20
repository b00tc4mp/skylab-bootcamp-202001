import validate from 'crediday-utils'
import { NotAllowedError } from 'crediday-errors'
const API_URL = process.env.REACT_APP_API_URL

export default async ({code, email}) => {

  validate.string(code, 'Código')
  code = code.trim().toLowerCase()
  validate.length(code, 'Código incorrecto', 6, 6, true)

  const response = await fetch(`${API_URL}/users/confirm-verification-code`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, email })
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