const {authenticateUser} = require('../logic')
const jwt = require('jsonwebtoken')
const {env: {JWT_EXP: expiresIn, JWT_SECRET}} = process

module.exports = (req, res) => {
  try {
    const {body: {email, password}} = req

    authenticateUser(email, password)
    .then(id => res.status(200).json({ token: jwt.sign({ sub:id }, JWT_SECRET, {expiresIn}) }))
    .catch(({message}) => res.status(401).json({ error: message }))
    
  } catch ({message}) {
    
    res.status(401).json({error: message})
  }
}