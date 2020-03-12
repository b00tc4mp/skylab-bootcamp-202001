const { registerPayment } = require('../../logic')
const { asyncHandler } = require('../../middleware')

module.exports = {
  register: asyncHandler(async ({params, body}, res, next) => {
    await registerPayment(params.id, body)
    res.status(200).json({ message: 'Payment registered successfully' })
  })
}