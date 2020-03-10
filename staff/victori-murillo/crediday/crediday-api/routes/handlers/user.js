const { registerUser, authenticateUser, retrieveUser, retrieveAllUsers } = require('../../logic')
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
    res.status(200).json({ token: sign({ sub, com }, JWT_SECRET, { expiresIn: '1h' }) })
  }),

  retrieve: asyncHandler(async (req, res, next) => {
    const user = await retrieveUser(req.payload.sub)
    res.status(200).json({ user })
  }),

  retrieveAll: asyncHandler(async (req, res, next) => {
    console.log('hiii')
    const users = await retrieveAllUsers(req.payload.com)
    res.status(200).json({ users })
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