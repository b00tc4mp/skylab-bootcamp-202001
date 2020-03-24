const { registerUser, authenticateUser, retrieveUser, retrieveAllUsers, updateUser, deleteUser,
  confirmDataToRecoverPassword, confirmVerificationCode, updatePasswordCode } = require('../../logic')
const { asyncHandler } = require("../../middleware")
const { env: { JWT_EXP: expiresIn, JWT_SECRET } } = process
const { sign } = require('jsonwebtoken')

module.exports = {
  register: asyncHandler(async (req, res, next) => {
    console.log(req.payload.sub, req.body)
    await registerUser(req.payload.sub, req.body)
    res.json({ message: 'User registered successfully' })
  }),

  authenticate: asyncHandler(async (req, res, next) => {
    const id = await authenticateUser(req.body)
    res.json({ token: sign({ sub: id }, JWT_SECRET, { expiresIn }) })
  }),

  retrieve: asyncHandler(async ({ payload, params: { id } }, res, next) => {
    if (!id) id = payload.sub
    res.json({ user: await retrieveUser(id) })
  }),

  retrieveAll: asyncHandler(async (req, res, next) => {
    console.log('RETR')
    res.json({ users: await retrieveAllUsers(req.payload.sub) })
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