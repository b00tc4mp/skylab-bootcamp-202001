const {retrieveUser} = require('../logic')

module.exports = (req, res) => {
  const {headers: { authorization }} = req
  const [, token] = authorization.split(' ')

  try {
    retrieveUser(token)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(({message}) => res.status(401).send(message))

  } catch ({message}) {
    res.status(401).send(message)
  }
}