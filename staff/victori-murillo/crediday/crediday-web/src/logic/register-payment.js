import validate from 'crediday-utils'
import { NotAllowedError } from 'crediday-errors'
const API_URL = process.env.REACT_APP_API_URL

export default async (body, creditId) => {
  let { interest, amortize, moratorium } = body

  body.interest = parseInt(interest)
  body.amortize = parseInt(amortize)
  body.moratorium = parseInt(moratorium)
  body.amount = body.interest + body.amortize + body.moratorium

  validate.type(body.interest, 'Pago de Interes', Number)
  validate.type(body.amortize, 'Pago de Amortización', Number)
  validate.type(body.moratorium, 'Pago de Moratoria', Number)
  validate.type(body.amount, 'Pago total', Number)

  validate.string(creditId, 'creditId')

  const response = await fetch(`${API_URL}/payments/credit/${creditId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.session}`
    },
    body: JSON.stringify(body)
  })

  const { status } = response

  if (status === 201 || status === 200) {
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