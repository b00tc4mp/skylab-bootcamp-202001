const { registerUser, authenticateUser, retrieveUser } = require('../../logic')
const { asyncHandler } = require('../../mid-wares')
const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET, JWT_EXP: expiration } } = process

module.exports = {
    register: asyncHandler(async (req, res, next) => {

        await registerUser(req.body)
        res
            .status(201)
            .json({ message: 'user created' })

    }),
    authenticate: asyncHandler(async (req, res, next) => {
        const id = await authenticateUser(req.body)
        const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: expiration })

        res.status(200).json({ token })
    }),
    retrieve: asyncHandler(async (req, res, next) => {
        const user = await retrieveUser(req.payload)
        res.status(200).json(user)
    })

}