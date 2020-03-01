const {deleteUser} = require('../logic')

module.exports = (req, res) => {

  try {
    const {payload: {sub: id}} = req

    deleteUser(id)
    .then(() => res.status(200).end())
    .catch(({message}) => res.status(400).json({error: message}))
    
  } catch ({message}) {
    res.status(400).json({error: message})
  }
}