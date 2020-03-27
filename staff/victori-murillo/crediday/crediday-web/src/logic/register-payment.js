const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = ({ body, creditId, token }) => {
  let { interest, amortize, moratorium } = body

  body.interest = parseInt(interest)
  body.amortize = parseInt(amortize)
  body.moratorium = parseInt(moratorium)
  body.amount = body.interest + body.amortize + body.moratorium

  validate.type(body.interest, 'Pago de Interes', Number)
  validate.type(body.amortize, 'Pago de Amortización', Number)
  validate.type(body.moratorium, 'Pago de Moratoria', Number)
  validate.type(body.amount, 'Pago total', Number)

  console.log(creditId)
  console.log(typeof creditId)
  validate.string(creditId, 'creditId')

  return (async () => {
    const response = await fetch.post(`${API_URL}/payments/credit/${creditId}`, { token, body })
    return await handleError(response)
  })()
}