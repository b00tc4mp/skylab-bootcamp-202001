const jwt = require ('jsonwebtoken')
const {env: {JWT_SECRET}} = process

module.exports = (req, res, next) => {
    const {headers: {authoritzation}} = req

    if(!authoritzation) return res.status(401).json({error:'no authoritation header provided'})

    const [bearer, token] = authoritzation.split(' ')

    if (bearer.toLowerCase() !== 'bearer') return res.status(401).json({ error: 'invalid authorization header' })

    try {
        const payload = jwt.verify(token, JWT_SECRET)

        req.payload = payload

        next()
    } catch ({ message }) {
        res.status(401).json({ error: message })
    }
}