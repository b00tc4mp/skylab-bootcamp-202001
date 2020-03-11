const { registerUser, authenticateUser, retrieveUser, retrieveAllUsers, updateUser } = require('../../logic')
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
    const user = await retrieveUser(req.payload.sub)
    res.status(200).json({ user })
  }),

  retrieveAll: asyncHandler(async (req, res, next) => {
    const users = await retrieveAllUsers(req.payload.com)
    res.status(200).json({ users })
  }),

  update: asyncHandler(async ({ payload: { sub: id } }, res, next) => {
    if (id) id = 
    await updateUser(req.payload.sub, req.body)
    res.status(200).json({ message: 'User updated successfully' })
  }),

  // delete: asyncHandler(async (req, res, next) => {
  //   const sub = await authenticateUser(req.body)
  //   res.status(200).json({ token: jwt.sign({ sub }, 'secret', { expiresIn }) })
  // })
}