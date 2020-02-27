const {retrieveUser} = require('../logic')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = (req, res) => {

  try {
    const {payload: {sub: id}} = req

    retrieveUser(id)
    .then(user => res.status(200).json(user))
    .catch(({message}) => res.status(401).send(message))

  } catch (error) {
    let status = 400

    if (error instanceof NotFoundError) status = 404
    if (error instanceof NotAllowedError) status = 403

    res.status(status).json({error: error.message})
  }

}