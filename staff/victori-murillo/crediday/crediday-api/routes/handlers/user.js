const { registerUser, authenticateUser } = require('../../logic')
const { asyncHandler } = require("../../middleware")
const { env: { JWT_EXP: expiresIn } } = process
const { sign } = require('jsonwebtoken')

module.exports = {
  register: asyncHandler(async (req, res, next) => {
    await registerUser(req.body)
    res.status(201).json({ message: 'User registered successfully' })
  }),

  authenticate: asyncHandler(async (req, res, next) => {
    console.log('hii');
    const sub = await authenticateUser(req.body)
    res.status(200).json({ token: sign({ sub }, 'secret', { expiresIn }) })
  }),

  retrieve: asyncHandler(async (req, res, next) => {
    const sub = await authenticateUser(req.body)
    res.status(200).json({ token: sign({ sub }, 'secret', { expiresIn }) })
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