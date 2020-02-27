const jwt = require('jsonwebtoken')
const { validate } = require('../utils')
const { env: { SECRET } } = process

module.exports = (req, res, next) => {
    debugger
    const { headers: { authorization } } = req
    try {
        if (!authorization) throw new Error('invalid token')
        const [, token] = authorization.split(' ')
        if (!token) throw new Error('invalid token')

        const { sub } = jwt.verify(token, SECRET)

        req.sub = sub

        next()
    } catch ({ message }) {
        res
            .status(401)
            .json({ error: message })
    }
}