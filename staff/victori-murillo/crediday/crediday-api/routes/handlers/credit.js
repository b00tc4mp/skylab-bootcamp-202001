const { registerCredit } = require('../../logic')
const { asyncHandler } = require('../../middleware')

module.exports = {
  register: asyncHandler(async ({params, body}, res, next) => {
    await registerCredit(params.id, body)
    res.status(200).json({ message: 'Credit registered successfully' })
  })
}