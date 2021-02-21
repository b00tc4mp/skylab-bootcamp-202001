const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET } } = process

module.exports = (req, res, next) => {
  try {
    const { headers: { authorization } } = req

    if (!authorization) throw new Error('no authorization header provided')

    const [bearer, token] = authorization.split(' ')

    if (bearer.toLowerCase() !== 'bearer') throw new Error('invalid authorization header')

    const payload = jwt.verify(token, JWT_SECRET)

    req.payload = payload

    next()
    
  } catch (error) {
    console.log('error in catch jwt verify')
    next(error)
  }
}
