const {updateUser} = require('../logic')

module.exports = (req, res) => {

  try {
    const {body, payload: {sub}} = req

    updateUser(body, sub)
    .then(() => res.status(200).end())
    .catch(({message}) => res.status(400).json({error: message}))

  } catch ({message}) {
    // check different errors
    res.status(400).json({error: message})
  }
}