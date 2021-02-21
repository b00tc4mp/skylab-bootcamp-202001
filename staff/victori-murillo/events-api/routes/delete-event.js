const {deleteEvent} = require('../logic')

module.exports = (req, res) => {

  try {
    const {payload: {sub: userId},params: {eventId}} = req



    deleteEvent(userId, eventId)
    .then(() => res.status(200).json({message: 'event deleted by creator'}))
    .catch(({message}) => res.status(400).json({error: message}))
    
  } catch ({message}) {
    res.status(400).json({error: message})
  }
}