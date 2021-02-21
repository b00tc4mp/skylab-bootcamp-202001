const { registerUser, authenticateUser, retrieveUser, updateUser, deleteUser } = require("../logic")
const jwt = require('jsonwebtoken')
const { env: { JWT_EXP: expiresIn, JWT_SECRET } } = process

exports = {
  register: async (req, res, next) => {
    await registerUser(req.body)
    res.json({ message: 'user registered sucessfully' })
  },

  authenticate: async (req, res, next) => {
    const sub = await authenticateUser(req.body)
    res.status(200).json({ token: jwt.sign({ sub }, JWT_SECRET, { expiresIn }) })
  },

  retrieve: async ({ params: { id }, payload }, res, next) => {
    if (!id) id = payload.sub
    const user = await retrieveUser(id)
    res.json(user)
  },

  update: async ({body, payload}, res, next) => {
    await updateUser(body, payload.sub)
    res.json({ message: 'user updated sucessfully' })
  },

  remove: async (req, res, next) => {
    await deleteUser(req.body)
    res.json({ message: 'user deleted sucessfully' })
  },
}
