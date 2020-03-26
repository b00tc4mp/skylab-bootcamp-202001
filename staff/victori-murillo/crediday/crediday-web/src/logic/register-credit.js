const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = ({ body, userId, token }) => {
  let { amount, paymentInterest, paymentAmortize, paymentMoratorium } = body

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

  return (async () => {
    const response = await fetch.post(`${API_URL}/credits/users/${userId}`, { token, body })
    return await handleError(response)
  })()
}