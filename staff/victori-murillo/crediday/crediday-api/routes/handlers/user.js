const { registerUser } = require('../../logic')
const { asyncHandler } = require("../../middleware")

module.exports = {
  register: asyncHandler(async (req, res, next) => {
    await registerUser(req.body)
    res.status(200).json({ message: 'User registered successfully' })
  })
}