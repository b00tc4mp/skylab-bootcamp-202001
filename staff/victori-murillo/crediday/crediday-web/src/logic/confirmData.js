import validate from 'crediday-utils'
import { NotAllowedError } from 'crediday-errors'
const API_URL = process.env.REACT_APP_API_URL

export default async ({company, email}) => {

  validate.string(company, 'Nombre de Compañia')
  company = company.trim().toLowerCase()
  validate.length(company, 'Nombre de Compañia', 3, 30)

  validate.string(email, 'email')
  email = email.trim().toLowerCase()
  validate.email(email)

  const response = await fetch(`${API_URL}/users/confirm-data`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company, email })
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