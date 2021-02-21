const { registerPayment, retrievePaymentsByCompany } = require('../../logic')
const { asyncHandler } = require('../../middleware')

module.exports = {
  register: asyncHandler(async ({ params: { creditId }, body, payload }, res, next) => {
    await registerPayment({ creditId, body })
    res.json({ message: 'Payment registered successfully' })
  }),

  retrieveByCompany: asyncHandler(async ({ payload }, res, next) => {
    res.json({ payments: await retrievePaymentsByCompany(payload.sub) })
  })
}