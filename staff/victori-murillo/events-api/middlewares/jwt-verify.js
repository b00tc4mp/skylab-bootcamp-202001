const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET } } = process

module.exports = (req, res, next) => {
  try {
    const {headers: {authorization}} = req
    if (!authorization) throw new Error('no authorization header provided')

    const [bearer, token] = authorization.split(' ')

    if (bearer.toLowerCase() !== 'bearer') throw new Error('invalid authorization header')

    const payload = jwt.verify(token, JWT_SECRET)

    req.payload = payload

    next()
  } catch ({message}) {
    res.status(401).json({error: message})
  }
}

/*
const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET } } = process

module.exports = (req, res, next) => {
    const { headers: { authorization } } = req

    if (!authorization) return res.status(401).json({ error: 'no authorization header provided' })

    const [bearer, token] = authorization.split(' ')

    if (bearer.toLowerCase() !== 'bearer') return res.status(401).json({ error: 'invalid authorization header' })

    try {
        const payload = jwt.verify(token, JWT_SECRET)

        req.payload = payload

        next()
    } catch ({ message }) {
        res.status(401).json({ error: message })
    }
}
*/