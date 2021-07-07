const {updateEvent} = require('../logic')

module.exports = (req, res) => {

  try {
    const {body, params: {eventId}} = req

    updateEvent(body, eventId)
    .then(() => res.status(200).end())
    .catch(({message}) => res.status(400).json({error: message}))

  } catch ({message}) {
    // check different errors
    res.status(400).json({error: message})
  }
}