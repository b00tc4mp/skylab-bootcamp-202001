const { registerUser, authenticateUser } = require('../../logic')
const { asyncHandler } = require("../../middleware")
const { env: { JWT_EXP: expiresIn, JWT_SECRET } } = process
const { sign } = require('jsonwebtoken')

module.exports = {
  register: asyncHandler(async (req, res, next) => {
    await registerUser(req.payload, req.body)
    res.status(201).json({ message: 'User registered successfully' })
  }),

  authenticate: asyncHandler(async (req, res, next) => {
    const { sub, com } = await authenticateUser(req.body)
    res.status(200).json({ token: sign({ sub, com }, JWT_SECRET, { expiresIn }) })
  }),

  retrieve: asyncHandler(async (req, res, next) => {
    const sub = await authenticateUser(req.body)
    res.status(200).json({ token: sign({ sub }, JWT_SECRET, { expiresIn }) })
  }),

  // update: asyncHandler(async (req, res, next) => {
  //   const sub = await authenticateUser(req.body)
  //   res.status(200).json({ token: jwt.sign({ sub }, 'secret', { expiresIn }) })
  // }),

  // delete: asyncHandler(async (req, res, next) => {
  //   const sub = await authenticateUser(req.body)
  //   res.status(200).json({ token: jwt.sign({ sub }, 'secret', { expiresIn }) })
  // })
}