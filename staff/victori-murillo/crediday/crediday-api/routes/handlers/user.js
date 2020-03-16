const { registerUser, authenticateUser, retrieveUser, retrieveAllUsers, updateUser, deleteUser,
  confirmDataToRecoverPassword, confirmVerificationCode, updatePasswordCode } = require('../../logic')
const { asyncHandler } = require("../../middleware")
const { env: { JWT_EXP: expiresIn, JWT_SECRET } } = process
const { sign } = require('jsonwebtoken')

module.exports = {
  register: asyncHandler(async (req, res, next) => {
    await registerUser(req.payload.com, req.body)
    res.json({ message: 'User registered successfully' })
  }),

  authenticate: asyncHandler(async (req, res, next) => {
    const { sub, com } = await authenticateUser(req.body)
    res.json({ token: sign({ sub, com }, JWT_SECRET, { expiresIn }) })
  }),

  retrieve: asyncHandler(async (req, res, next) => {
    const user = await retrieveUser(req.payload.sub)
    res.json({ user })
  }),

  retrieveAll: asyncHandler(async (req, res, next) => {
    console.log(req)
    const users = await retrieveAllUsers(req.payload.com)
    res.json({ users })
  }),

  update: asyncHandler(async ({ payload, body, params: { id } }, res, next) => {
    if (!id) id = payload.sub
    await updateUser(id, payload.com, body)
    res.json({ message: 'User updated successfully' })
  }),

  delete: asyncHandler(async ({ payload, params }, res, next) => {
    await deleteUser(params.id, payload.com)
    res.json({ message: 'User deleted successfully' })
  }),

  confirmData: asyncHandler(async ({ body }, res, next) => {
    res.json({ message: await confirmDataToRecoverPassword(body) })
  }),

  confirmCode: asyncHandler(async ({ body }, res, next) => {
    res.json({ message: await confirmVerificationCode(body) })
  }),

  updatePassword: asyncHandler(async ({ body }, res, next) => {
    res.json({ message: await updatePasswordCode(body) })
  })
}