const { registerCredit } = require('../../logic')
const { asyncHandler } = require('../../middleware')

module.exports = {
  register: asyncHandler(async (req, res, next) => {
    await registerCredit(req.body)
    res.status(200).json({ message: 'Credit registered successfully' })
  })
}