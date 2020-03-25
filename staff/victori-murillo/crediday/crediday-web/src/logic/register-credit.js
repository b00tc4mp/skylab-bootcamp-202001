import validate from 'crediday-utils'
import { NotAllowedError } from 'crediday-errors'
const API_URL = process.env.REACT_APP_API_URL

export default async (body, userId) => {
  let {amount, paymentInterest, paymentAmortize, paymentMoratorium} = body

  body.amount = parseInt(amount)
  body.paymentInterest = parseInt(paymentInterest)
  body.paymentAmortize = parseInt(paymentAmortize)
  body.paymentMoratorium = parseInt(paymentMoratorium)
  body.paymentDefault = body.paymentInterest + body.paymentAmortize
  
  validate.type(body.amount, 'Monto', Number)
  validate.type(body.paymentInterest, 'Pago de Interes', Number)
  validate.type(body.paymentAmortize, 'Pago de Amortización', Number)
  validate.type(body.paymentMoratorium, 'Pago de Moratoria', Number)
  validate.type(body.paymentDefault, 'Pago', Number)
  
  validate.string(userId, 'userId')

  const response = await fetch(`${API_URL}/credits/users/${userId}`, {
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