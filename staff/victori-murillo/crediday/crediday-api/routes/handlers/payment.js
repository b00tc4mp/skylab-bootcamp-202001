const { registerPayment, retrievePaymentsByCompany } = require('../../logic')
const { asyncHandler } = require('../../middleware')

module.exports = {
  register: asyncHandler(async ({ params: { creditId }, body, payload }, res, next) => {
    await registerPayment({ userId: payload.sub, creditId, body })
    res.json({ message: 'Payment registered successfully' })
  }),

  retrieveByCompany: asyncHandler(async ({ payload }, res, next) => {
    res.json({ credits: await retrievePaymentsByCompany(payload.sub) })
  })
}